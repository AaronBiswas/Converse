import Conversation from "../models/conversation.model.js";
import Message from "../models/Message.model.js";
import { getReceiverSocketId, io } from "../Socket/Socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);


    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: usertoChatId } = req.params;
    const senderId = req.user._id;

    console.log("getMessage called with params:", { 
      usertoChatId, 
      senderId,
      originalId: req.params.id,
      path: req.path,
      url: req.originalUrl
    });

    // Try finding the conversation by participant IDs
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, usertoChatId],
      },
    });

    // If no conversation, check if maybe the ID is a conversation ID directly
    if (!conversation) {
      // Try finding by conversation ID as a fallback
      const conversationById = await Conversation.findById(usertoChatId);
      
      if (conversationById) {
        // Make sure the current user is a participant
        if (conversationById.participants.includes(senderId)) {
          console.log(`Found conversation by ID: ${usertoChatId}`);
          
          // Fetch messages for the conversation
          const messages = await Message.find({
            _id: { $in: conversationById.messages }
          }).sort({ createdAt: 1 });
          
          console.log(`Found ${messages.length} messages in conversation by ID lookup`);
          return res.status(200).json(messages);
        } else {
          console.log("User is not a participant in this conversation");
          return res.status(403).json({ error: "Not authorized to view this conversation" });
        }
      }
      
      console.log("No conversation found between users:", senderId, usertoChatId);
      return res.status(200).json([]);
    }
    
    // Fetch messages for the conversation found by participants
    const messages = await Message.find({
      _id: { $in: conversation.messages }
    }).sort({ createdAt: 1 });
    
    console.log(`Found ${messages.length} messages in conversation by participant lookup`);
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};
