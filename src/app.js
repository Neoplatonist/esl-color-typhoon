/**
 * Color Typhoon Game - Main Application
 * Modern ES6 module-based implementation
 *
 * @author Production Engineering Team
 * @version 2.0.0
 */

import { GameManager } from "./modules/GameManager.js";

/**
 * Application class - Main entry point
 */
class ColorTyphoonApp {
  constructor() {
    this.gameManager = new GameManager();
    this.isReady = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Wait for DOM to be ready
      await this.waitForDOM();

      // Initialize game
      this.gameManager.init();
      this.isReady = true;

      console.log("Color Typhoon Game initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Color Typhoon Game:", error);
      throw error;
    }
  }

  /**
   * Wait for DOM to be ready
   * @returns {Promise} Promise that resolves when DOM is ready
   */
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * Get application status
   * @returns {Object} Application status information
   */
  getStatus() {
    return {
      isReady: this.isReady,
      gameState: this.gameManager.getState(),
    };
  }

  /**
   * Restart the game
   */
  restart() {
    if (this.isReady) {
      this.gameManager.init();
    }
  }
}

// Initialize and start the application
const app = new ColorTyphoonApp();

// Start the application
app.init().catch((error) => {
  console.error("Application startup failed:", error);
});

// Export for potential external access
export default app;
