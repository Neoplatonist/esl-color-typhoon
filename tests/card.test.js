/**
 * Card Component Tests
 */

import { Card } from "../src/components/Card.js";
import { GAME_CONFIG } from "../config/game.config.js";
import { setupTestDOM, simulateClick } from "./test-utils.js";

describe("Card Component", () => {
  let testColor, testPoints;

  beforeEach(() => {
    setupTestDOM();
    testColor = { name: "Red", value: "#FF0000" };
    testPoints = 3;
  });

  describe("Card Creation", () => {
    test("should create card with correct structure", () => {
      const card = new Card(testColor, testPoints);
      const element = card.getElement();

      expect(element.className).toBe(GAME_CONFIG.ui.classes.card);
      expect(
        element.querySelector(`.${GAME_CONFIG.ui.classes.cardInner}`)
      ).toBeTruthy();
      expect(
        element.querySelector(`.${GAME_CONFIG.ui.classes.cardFront}`)
      ).toBeTruthy();
      expect(
        element.querySelector(`.${GAME_CONFIG.ui.classes.cardBack}`)
      ).toBeTruthy();
    });

    test("should display correct color and name", () => {
      const card = new Card(testColor, testPoints);
      const element = card.getElement();

      const frontSide = element.querySelector(
        `.${GAME_CONFIG.ui.classes.cardFront}`
      );
      const titleElement = element.querySelector(
        `.${GAME_CONFIG.ui.classes.cardTitle}`
      );

      // Check that the color is applied (browsers convert hex to rgb format)
      expect(frontSide.style.backgroundColor).toBeTruthy();
      expect(titleElement.textContent).toBe(testColor.name);
    });

    test("should display correct points", () => {
      const card = new Card(testColor, testPoints);
      const element = card.getElement();

      const pointsElement = element.querySelector(
        `.${GAME_CONFIG.ui.classes.points}`
      );
      expect(pointsElement.textContent).toBe("3 Points");
    });

    test('should handle special "Point Reset" value', () => {
      const card = new Card(testColor, "Point Reset");
      const element = card.getElement();

      const pointsElement = element.querySelector(
        `.${GAME_CONFIG.ui.classes.points}`
      );
      expect(pointsElement.textContent).toBe("Point Reset");
    });
  });

  describe("Card Interactions", () => {
    test("should flip when clicked", () => {
      const card = new Card(testColor, testPoints);
      const element = card.getElement();

      expect(card.isFlipped()).toBe(false);
      expect(element.classList.contains(GAME_CONFIG.ui.classes.flipped)).toBe(
        false
      );

      simulateClick(element);

      expect(card.isFlipped()).toBe(true);
      expect(element.classList.contains(GAME_CONFIG.ui.classes.flipped)).toBe(
        true
      );
    });

    test("should toggle flip state on multiple clicks", () => {
      const card = new Card(testColor, testPoints);
      const element = card.getElement();

      simulateClick(element);
      expect(card.isFlipped()).toBe(true);

      simulateClick(element);
      expect(card.isFlipped()).toBe(false);
    });
  });

  describe("Card Updates", () => {
    test("should update color and points correctly", () => {
      const card = new Card(testColor, testPoints);
      const newColor = { name: "Blue", value: "#0000FF" };
      const newPoints = 5;

      card.update(newColor, newPoints);

      const element = card.getElement();
      const frontSide = element.querySelector(
        `.${GAME_CONFIG.ui.classes.cardFront}`
      );
      const titleElement = element.querySelector(
        `.${GAME_CONFIG.ui.classes.cardTitle}`
      );
      const pointsElement = element.querySelector(
        `.${GAME_CONFIG.ui.classes.points}`
      );

      // Check that the color is applied (browsers convert hex to rgb format)
      expect(frontSide.style.backgroundColor).toBeTruthy();
      expect(titleElement.textContent).toBe(newColor.name);
      expect(pointsElement.textContent).toBe("5 Points");
    });
  });
});
