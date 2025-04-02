/**
 * Utility function to generate random emojis for conversations
 */

// Array of emojis for conversations
const emojis = [
  "😊", "😎", "🙂", "😍", "🤩", "😇", "🥳", "🤔", "🤗", "😌", 
  "🥰", "😏", "😄", "😁", "😆", "😅", "😂", "🤣", "😉", "😋",
  "😜", "😝", "😛", "🤪", "🧐", "🤓", "😎", "🤠", "🥸", "🤑"
];

/**
 * Returns a random emoji from the emoji array
 * @returns {string} A random emoji
 */
export const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

/**
 * Returns a specific emoji based on index
 * @param {number} index - The index of the emoji to return
 * @returns {string} The emoji at the specified index or a random one if index is invalid
 */
export const getEmojiByIndex = (index) => {
  if (index >= 0 && index < emojis.length) {
    return emojis[index];
  }
  return getRandomEmoji();
};

/**
 * Returns all available emojis
 * @returns {string[]} Array of all emojis
 */
export const getAllEmojis = () => {
  return [...emojis];
};
