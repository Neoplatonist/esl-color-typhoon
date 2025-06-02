/**
 * Array Utilities
 * Common array manipulation functions
 */

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle (modified in place)
 * @returns {Array} The shuffled array
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Create a shallow copy of an array and shuffle it
 * @param {Array} array - Original array to shuffle
 * @returns {Array} New shuffled array
 */
export function getShuffledCopy(array) {
  return shuffleArray([...array]);
}

/**
 * Distribute items evenly across a target length
 * @param {Array} items - Items to distribute
 * @param {number} targetLength - Target array length
 * @returns {Array} Array with evenly distributed items
 */
export function distributeEvenly(items, targetLength) {
  const result = [];

  while (result.length < targetLength) {
    result.push(...items);
  }

  return result.slice(0, targetLength);
}
