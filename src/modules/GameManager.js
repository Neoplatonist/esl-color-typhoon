/**
 * Game Manager
 * Central game logic and state management
 */

import { GAME_CONFIG } from "../../config/game.config.js";
import { Card } from "../components/Card.js";
import { createPointsDistribution } from "./PointsDistribution.js";
import { getShuffledCopy } from "../utils/array.utils.js";

/**
 * GameManager class handles the overall game state and logic
 */
export class GameManager {
  constructor() {
    this.cards = [];
    this.areNamesVisible = true;
    this.isInitialized = false;
    this.elements = this.initializeElements();
  }

  /**
   * Initialize DOM elements
   * @returns {Object} Object containing DOM element references
   */
  initializeElements() {
    const { selectors } = GAME_CONFIG.ui;

    return {
      cardGrid: document.querySelector(selectors.cardGrid),
      randomizeBtn: document.querySelector(selectors.randomizeBtn),
      flipAllBtn: document.querySelector(selectors.flipAllBtn),
      toggleNamesSwitch: document.querySelector(selectors.toggleNamesSwitch),
    };
  }

  /**
   * Initialize the game
   */
  init() {
    if (this.isInitialized) {
      this.reset();
    }

    this.createCards();
    this.bindEvents();
    this.isInitialized = true;
  }

  /**
   * Create all game cards
   */
  createCards() {
    // Clear existing cards
    this.clearCards();

    // Get shuffled colors and points
    const shuffledColors = getShuffledCopy(GAME_CONFIG.colors);
    const pointsDistribution = createPointsDistribution();

    // Create cards
    for (let i = 0; i < GAME_CONFIG.numberOfCards; i++) {
      const card = new Card(shuffledColors[i], pointsDistribution[i]);
      this.cards.push(card);
      this.elements.cardGrid.appendChild(card.getElement());
    }
  }

  /**
   * Clear all cards from the game
   */
  clearCards() {
    this.cards = [];
    if (this.elements.cardGrid) {
      this.elements.cardGrid.innerHTML = "";
    }
  }

  /**
   * Randomize all cards with animation handling
   */
  randomize() {
    const flippedCards = this.cards.filter((card) => card.isFlipped());

    if (flippedCards.length > 0) {
      // Flip cards to color side first, then randomize
      this.flipCardsToColorSide(flippedCards, () => {
        this.performRandomization();
      });
    } else {
      this.performRandomization();
    }
  }

  /**
   * Flip specified cards to color side with callback
   * @param {Array} cardsToFlip - Cards to flip
   * @param {Function} callback - Callback to execute after animation
   */
  flipCardsToColorSide(cardsToFlip, callback) {
    cardsToFlip.forEach((card) => card.flip());

    setTimeout(callback, GAME_CONFIG.animationDuration);
  }

  /**
   * Perform the actual randomization
   */
  performRandomization() {
    const shuffledColors = getShuffledCopy(GAME_CONFIG.colors);
    const pointsDistribution = createPointsDistribution();

    this.cards.forEach((card, index) => {
      card.update(shuffledColors[index], pointsDistribution[index]);
    });
  }

  /**
   * Flip all cards to show points
   */
  flipAllCards() {
    this.cards
      .filter((card) => !card.isFlipped())
      .forEach((card) => card.flip());
  }

  /**
   * Toggle visibility of color names
   */
  toggleColorNames() {
    this.areNamesVisible = this.elements.toggleNamesSwitch.checked;

    if (this.areNamesVisible) {
      this.elements.cardGrid.classList.remove(GAME_CONFIG.ui.classes.hideNames);
    } else {
      this.elements.cardGrid.classList.add(GAME_CONFIG.ui.classes.hideNames);
    }
  }

  /**
   * Reset the game to initial state
   */
  reset() {
    this.clearCards();
    this.areNamesVisible = true;
    if (this.elements.toggleNamesSwitch) {
      this.elements.toggleNamesSwitch.checked = true;
    }
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.elements.randomizeBtn) {
      this.elements.randomizeBtn.addEventListener("click", () =>
        this.randomize()
      );
    }

    if (this.elements.flipAllBtn) {
      this.elements.flipAllBtn.addEventListener("click", () =>
        this.flipAllCards()
      );
    }

    if (this.elements.toggleNamesSwitch) {
      this.elements.toggleNamesSwitch.addEventListener("change", () =>
        this.toggleColorNames()
      );
    }
  }

  /**
   * Get current game state
   * @returns {Object} Current game state
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      areNamesVisible: this.areNamesVisible,
      cardCount: this.cards.length,
      flippedCardCount: this.cards.filter((card) => card.isFlipped()).length,
    };
  }
}
