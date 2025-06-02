/**
 * Points Distribution Module
 * Handles the creation and management of point distributions according to game rules
 */

import { GAME_CONFIG } from "../../config/game.config.js";
import { shuffleArray, distributeEvenly } from "../utils/array.utils.js";

/**
 * Create a balanced distribution of points following game rules
 * @returns {Array} Array of point values for all cards
 */
export function createPointsDistribution() {
  const { rules, numberOfCards } = GAME_CONFIG;
  const { regularPoints, specialPoints, regularPointCards } = rules;

  // Create array with regular points distributed evenly
  const pointsArray = distributeEvenly(regularPoints, regularPointCards);

  // Add special points
  pointsArray.push(specialPoints.bonus);
  pointsArray.push(specialPoints.reset);

  // Validate distribution
  if (pointsArray.length !== numberOfCards) {
    throw new Error(
      `Points distribution mismatch: expected ${numberOfCards}, got ${pointsArray.length}`
    );
  }

  // Shuffle and return
  return shuffleArray(pointsArray);
}

/**
 * Validate points distribution meets game rules
 * @param {Array} distribution - Points distribution to validate
 * @returns {boolean} True if distribution is valid
 */
export function validatePointsDistribution(distribution) {
  const { rules, numberOfCards } = GAME_CONFIG;

  if (distribution.length !== numberOfCards) {
    return false;
  }

  const bonusCount = distribution.filter(
    (p) => p === rules.specialPoints.bonus
  ).length;
  const resetCount = distribution.filter(
    (p) => p === rules.specialPoints.reset
  ).length;
  const regularCount = distribution.filter((p) =>
    rules.regularPoints.includes(p)
  ).length;

  return (
    bonusCount === 1 &&
    resetCount === 1 &&
    regularCount === rules.regularPointCards
  );
}
