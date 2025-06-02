/**
 * Game Configuration
 * Central configuration for all game settings and constants
 */

export const GAME_CONFIG = {
  // Game settings
  numberOfCards: 11,
  animationDuration: 600, // in milliseconds

  // Card distribution rules
  rules: {
    regularPoints: [1, 2, 3],
    specialPoints: {
      bonus: 5,
      reset: "Point Reset",
    },
    // Ensures 9 regular point cards, 1 bonus, 1 reset
    regularPointCards: 9,
  },

  // Color definitions
  colors: [
    { name: "Red", value: "#FF0000" },
    { name: "Orange", value: "#FFA500" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Green", value: "#008000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Purple", value: "#800080" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Gray", value: "#808080" },
    { name: "Brown", value: "#A52A2A" },
    { name: "Pink", value: "#FFC0CB" },
  ],

  // UI settings
  ui: {
    selectors: {
      cardGrid: "#card-grid",
      randomizeBtn: "#randomize-btn",
      flipAllBtn: "#flip-all-btn",
      toggleNamesSwitch: "#toggle-names-switch",
    },
    classes: {
      card: "card",
      cardInner: "card-inner",
      cardFront: "card-front",
      cardBack: "card-back",
      cardTitle: "card-title",
      points: "points",
      flipped: "flipped",
      hideNames: "hide-names",
    },
  },

  // Accessibility settings
  accessibility: {
    contrastThreshold: 0.5, // luminance threshold for text color switching
    textShadow: {
      dark: "1px 1px 3px rgba(0, 0, 0, 0.7)",
      light: "none",
    },
  },
};

export default GAME_CONFIG;
