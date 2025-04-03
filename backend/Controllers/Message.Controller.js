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

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, usertoChatId],
      },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
