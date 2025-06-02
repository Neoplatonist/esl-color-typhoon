/**
 * Color Utilities
 * Functions for color manipulation and contrast calculation
 */

import { GAME_CONFIG } from "../../config/game.config.js";

/**
 * Calculate the luminance of a color to determine optimal text contrast
 * @param {string} hexColor - Hex color string (e.g., "#FF0000")
 * @returns {number} Luminance value between 0 and 1
 */
export function calculateLuminance(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance using modern approach based on human perception
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Get optimal text color (black or white) for given background color
 * @param {string} hexColor - Background color in hex format
 * @returns {string} Optimal text color ("#000000" or "#FFFFFF")
 */
export function getOptimalTextColor(hexColor) {
  const luminance = calculateLuminance(hexColor);
  return luminance > GAME_CONFIG.accessibility.contrastThreshold
    ? "#000000"
    : "#FFFFFF";
}

/**
 * Get appropriate text shadow for given text color
 * @param {string} textColor - Text color ("#000000" or "#FFFFFF")
 * @returns {string} CSS text-shadow value
 */
export function getTextShadow(textColor) {
  return textColor === "#FFFFFF"
    ? GAME_CONFIG.accessibility.textShadow.dark
    : GAME_CONFIG.accessibility.textShadow.light;
}

/**
 * Apply optimal styling to text element based on background color
 * @param {HTMLElement} element - Text element to style
 * @param {string} backgroundColor - Background color in hex format
 */
export function applyOptimalTextStyling(element, backgroundColor) {
  const textColor = getOptimalTextColor(backgroundColor);
  const textShadow = getTextShadow(textColor);

  element.style.color = textColor;
  element.style.textShadow = textShadow;
}
