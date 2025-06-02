/**
 * Card Component
 * Handles individual card creation, state management, and interactions
 */

import { GAME_CONFIG } from "../../config/game.config.js";
import { applyOptimalTextStyling } from "../utils/color.utils.js";

/**
 * Card class representing a single game card
 */
export class Card {
  constructor(colorInfo, points) {
    this.colorInfo = colorInfo;
    this.points = points;
    this.flipped = false;
    this.element = this.createElement();
    this.bindEvents();
  }

  /**
   * Create the DOM element for the card
   * @returns {HTMLElement} Card DOM element
   */
  createElement() {
    const { classes } = GAME_CONFIG.ui;

    // Create card structure
    const cardElement = document.createElement("div");
    cardElement.className = classes.card;

    const cardInner = document.createElement("div");
    cardInner.className = classes.cardInner;

    const cardFront = this.createCardFront();
    const cardBack = this.createCardBack();

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);

    return cardElement;
  }

  /**
   * Create the front side of the card (color side)
   * @returns {HTMLElement} Card front element
   */
  createCardFront() {
    const { classes } = GAME_CONFIG.ui;

    const cardFront = document.createElement("div");
    cardFront.className = classes.cardFront;
    cardFront.style.backgroundColor = this.colorInfo.value;

    const cardTitle = document.createElement("div");
    cardTitle.className = classes.cardTitle;
    cardTitle.textContent = this.colorInfo.name;

    // Apply optimal text styling for contrast
    applyOptimalTextStyling(cardTitle, this.colorInfo.value);

    cardFront.appendChild(cardTitle);
    return cardFront;
  }

  /**
   * Create the back side of the card (points side)
   * @returns {HTMLElement} Card back element
   */
  createCardBack() {
    const { classes } = GAME_CONFIG.ui;

    const cardBack = document.createElement("div");
    cardBack.className = classes.cardBack;

    const pointsElement = document.createElement("div");
    pointsElement.className = classes.points;
    pointsElement.textContent = this.formatPoints(this.points);

    cardBack.appendChild(pointsElement);
    return cardBack;
  }

  /**
   * Format points for display
   * @param {number|string} points - Point value
   * @returns {string} Formatted points text
   */
  formatPoints(points) {
    return points === GAME_CONFIG.rules.specialPoints.reset
      ? GAME_CONFIG.rules.specialPoints.reset
      : `${points} Points`;
  }

  /**
   * Bind event listeners to the card
   */
  bindEvents() {
    this.element.addEventListener("click", () => this.flip());
  }

  /**
   * Flip the card between color and points side
   */
  flip() {
    this.flipped = !this.flipped;
    this.element.classList.toggle(GAME_CONFIG.ui.classes.flipped);
  }

  /**
   * Update card with new color and points
   * @param {Object} newColorInfo - New color information
   * @param {number|string} newPoints - New points value
   */
  update(newColorInfo, newPoints) {
    this.colorInfo = newColorInfo;
    this.points = newPoints;

    // Update front side
    const frontSide = this.element.querySelector(
      `.${GAME_CONFIG.ui.classes.cardFront}`
    );
    const colorTitle = this.element.querySelector(
      `.${GAME_CONFIG.ui.classes.cardTitle}`
    );

    frontSide.style.backgroundColor = newColorInfo.value;
    colorTitle.textContent = newColorInfo.name;
    applyOptimalTextStyling(colorTitle, newColorInfo.value);

    // Update back side
    const pointsElement = this.element.querySelector(
      `.${GAME_CONFIG.ui.classes.points}`
    );
    pointsElement.textContent = this.formatPoints(newPoints);
  }

  /**
   * Check if card is currently flipped
   * @returns {boolean} True if card is showing points side
   */
  isFlipped() {
    return this.flipped;
  }

  /**
   * Get card's DOM element
   * @returns {HTMLElement} Card element
   */
  getElement() {
    return this.element;
  }
}
