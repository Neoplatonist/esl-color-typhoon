/**
 * Game Manager Tests
 * Test suite for the main game management logic
 */

import { GameManager } from "../src/modules/GameManager.js";
import { GAME_CONFIG } from "../config/game.config.js";
import { setupTestDOM, simulateClick, waitForAnimation } from "./test-utils.js";

describe("GameManager", () => {
  let gameManager;
  let elements;

  beforeEach(() => {
    elements = setupTestDOM();
    gameManager = new GameManager();
  });

  afterEach(() => {
    // Clean up any running animations or timers
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    test("should initialize with correct default state", () => {
      expect(gameManager.isInitialized).toBe(false);
      expect(gameManager.areNamesVisible).toBe(true);
      expect(gameManager.cards).toEqual([]);
    });

    test("should create correct number of cards on init", () => {
      gameManager.init();

      expect(gameManager.isInitialized).toBe(true);
      expect(gameManager.cards.length).toBe(GAME_CONFIG.numberOfCards);
    });

    test("should populate card grid with DOM elements", () => {
      gameManager.init();

      const cardGrid = document.getElementById("card-grid");
      const cardElements = cardGrid.querySelectorAll(".card");

      expect(cardElements.length).toBe(GAME_CONFIG.numberOfCards);
    });

    test("should bind event listeners correctly", () => {
      gameManager.init();

      const randomizeBtn = document.getElementById("randomize-btn");
      const flipAllBtn = document.getElementById("flip-all-btn");
      const toggleSwitch = document.getElementById("toggle-names-switch");

      // Check that buttons exist and are properly bound
      expect(randomizeBtn).toBeTruthy();
      expect(flipAllBtn).toBeTruthy();
      expect(toggleSwitch).toBeTruthy();

      // Test event listener functionality by triggering clicks
      const initialCardCount = gameManager.cards.length;

      // Test randomize button
      randomizeBtn.click();
      expect(gameManager.cards.length).toBe(initialCardCount);

      // Test flip all button
      const initialFlippedCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      flipAllBtn.click();
      const afterFlipCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      expect(afterFlipCount).toBeGreaterThan(initialFlippedCount);
    });
  });

  describe("Game Actions", () => {
    beforeEach(() => {
      gameManager.init();
    });

    test("should flip all cards when flipAllCards is called", () => {
      // Initially no cards should be flipped
      const initialFlippedCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      expect(initialFlippedCount).toBe(0);

      gameManager.flipAllCards();

      // All cards should now be flipped
      const finalFlippedCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      expect(finalFlippedCount).toBe(GAME_CONFIG.numberOfCards);
    });

    test("should randomize cards with new colors and points", () => {
      const originalColors = gameManager.cards.map(
        (card) => card.colorInfo.name
      );
      const originalPoints = gameManager.cards.map((card) => card.points);

      gameManager.performRandomization();

      const newColors = gameManager.cards.map((card) => card.colorInfo.name);
      const newPoints = gameManager.cards.map((card) => card.points);

      // At least some colors or points should be different
      const colorsChanged = originalColors.some(
        (color, index) => color !== newColors[index]
      );
      const pointsChanged = originalPoints.some(
        (points, index) => points !== newPoints[index]
      );

      expect(colorsChanged || pointsChanged).toBe(true);
    });

    test("should handle randomization with flipped cards", async () => {
      // Flip some cards first
      gameManager.cards.slice(0, 3).forEach((card) => card.flip());

      const flippedCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      expect(flippedCount).toBe(3);

      gameManager.randomize();

      // Wait for animation to complete
      await waitForAnimation();

      // After randomization, no cards should be flipped
      const finalFlippedCount = gameManager.cards.filter((card) =>
        card.isFlipped()
      ).length;
      expect(finalFlippedCount).toBe(0);
    });

    test("should toggle color names visibility", () => {
      const cardGrid = document.getElementById("card-grid");
      const toggleSwitch = document.getElementById("toggle-names-switch");

      // Initially names should be visible
      expect(gameManager.areNamesVisible).toBe(true);
      expect(cardGrid.classList.contains("hide-names")).toBe(false);

      // Toggle off
      toggleSwitch.checked = false;
      gameManager.toggleColorNames();

      expect(gameManager.areNamesVisible).toBe(false);
      expect(cardGrid.classList.contains("hide-names")).toBe(true);

      // Toggle back on
      toggleSwitch.checked = true;
      gameManager.toggleColorNames();

      expect(gameManager.areNamesVisible).toBe(true);
      expect(cardGrid.classList.contains("hide-names")).toBe(false);
    });
  });

  describe("State Management", () => {
    test("should return correct game state", () => {
      gameManager.init();

      const state = gameManager.getState();

      expect(state.isInitialized).toBe(true);
      expect(state.areNamesVisible).toBe(true);
      expect(state.cardCount).toBe(GAME_CONFIG.numberOfCards);
    });

    test("should reset game state correctly", () => {
      gameManager.init();

      // Modify some state
      gameManager.areNamesVisible = false;

      // Reset and verify
      gameManager.reset();

      expect(gameManager.areNamesVisible).toBe(true);
      expect(gameManager.cards.length).toBe(0);
    });

    test("should handle reset when toggleNamesSwitch is missing", () => {
      // Remove the toggle switch element to test conditional branch
      const toggleSwitch = document.getElementById("toggle-names-switch");
      if (toggleSwitch) {
        toggleSwitch.remove();
      }

      gameManager.init();
      gameManager.areNamesVisible = false;

      // This should not throw an error even without the switch element
      expect(() => gameManager.reset()).not.toThrow();
      expect(gameManager.areNamesVisible).toBe(true);
    });

    test("should handle re-initialization correctly", () => {
      // First initialization
      gameManager.init();
      expect(gameManager.isInitialized).toBe(true);
      const firstCardCount = gameManager.cards.length;

      // Re-initialize (should call reset internally)
      gameManager.init();
      expect(gameManager.isInitialized).toBe(true);
      expect(gameManager.cards.length).toBe(firstCardCount);
    });
  });
});
