/**
 * Points Distribution Tests
 * Test suite for points distribution logic
 */

import {
  createPointsDistribution,
  validatePointsDistribution,
} from "../src/modules/PointsDistribution.js";
import { GAME_CONFIG } from "../config/game.config.js";

describe("PointsDistribution", () => {
  describe("createPointsDistribution", () => {
    test("should create correct number of points", () => {
      const distribution = createPointsDistribution();
      expect(distribution.length).toBe(GAME_CONFIG.numberOfCards);
    });

    test("should include special points", () => {
      const distribution = createPointsDistribution();

      expect(distribution).toContain(GAME_CONFIG.rules.specialPoints.bonus);
      expect(distribution).toContain(GAME_CONFIG.rules.specialPoints.reset);
    });

    test("should include correct number of regular points", () => {
      const distribution = createPointsDistribution();
      const regularPointsCount = distribution.filter((p) =>
        GAME_CONFIG.rules.regularPoints.includes(p)
      ).length;

      expect(regularPointsCount).toBe(GAME_CONFIG.rules.regularPointCards);
    });

    test("should shuffle points", () => {
      const dist1 = createPointsDistribution();
      const dist2 = createPointsDistribution();

      // While shuffling could theoretically produce the same result,
      // it's extremely unlikely with 12 cards
      expect(dist1).not.toEqual(dist2);
    });
  });

  describe("validatePointsDistribution", () => {
    test("should validate correct distribution", () => {
      const distribution = createPointsDistribution();
      expect(validatePointsDistribution(distribution)).toBe(true);
    });

    test("should reject distribution with wrong length", () => {
      const shortDistribution = [1, 2, 3];
      expect(validatePointsDistribution(shortDistribution)).toBe(false);
    });

    test("should reject distribution without bonus point", () => {
      const distribution = new Array(GAME_CONFIG.numberOfCards).fill(1);
      distribution[distribution.length - 1] =
        GAME_CONFIG.rules.specialPoints.reset;

      expect(validatePointsDistribution(distribution)).toBe(false);
    });

    test("should reject distribution without reset point", () => {
      const distribution = new Array(GAME_CONFIG.numberOfCards).fill(1);
      distribution[distribution.length - 1] =
        GAME_CONFIG.rules.specialPoints.bonus;

      expect(validatePointsDistribution(distribution)).toBe(false);
    });

    test("should reject distribution with wrong number of regular points", () => {
      const distribution = [
        GAME_CONFIG.rules.specialPoints.bonus,
        GAME_CONFIG.rules.specialPoints.reset,
      ];
      // Fill with wrong number of regular points
      while (distribution.length < GAME_CONFIG.numberOfCards) {
        distribution.push(99); // Invalid regular point
      }

      expect(validatePointsDistribution(distribution)).toBe(false);
    });

    test("should reject distribution with multiple bonus points", () => {
      const distribution = [
        GAME_CONFIG.rules.specialPoints.bonus,
        GAME_CONFIG.rules.specialPoints.bonus, // Duplicate
        GAME_CONFIG.rules.specialPoints.reset,
      ];
      // Fill with regular points
      while (distribution.length < GAME_CONFIG.numberOfCards) {
        distribution.push(GAME_CONFIG.rules.regularPoints[0]);
      }

      expect(validatePointsDistribution(distribution)).toBe(false);
    });

    test("should reject distribution with multiple reset points", () => {
      const distribution = [
        GAME_CONFIG.rules.specialPoints.bonus,
        GAME_CONFIG.rules.specialPoints.reset,
        GAME_CONFIG.rules.specialPoints.reset, // Duplicate
      ];
      // Fill with regular points
      while (distribution.length < GAME_CONFIG.numberOfCards) {
        distribution.push(GAME_CONFIG.rules.regularPoints[0]);
      }

      expect(validatePointsDistribution(distribution)).toBe(false);
    });
  });
});
