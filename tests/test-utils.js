/**
 * Test Utilities
 * Helper functions for testing
 */

/**
 * Create a mock DOM element
 * @param {string} tagName - HTML tag name
 * @param {Object} attributes - Element attributes
 * @returns {HTMLElement} Mock DOM element
 */
export function createMockElement(tagName = "div", attributes = {}) {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "textContent") {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  return element;
}

/**
 * Setup basic DOM structure for testing
 */
export function setupTestDOM() {
  // Clear body
  document.body.innerHTML = "";

  // Create container
  const container = createMockElement("div", { className: "container" });

  // Create card grid
  const cardGrid = createMockElement("div", {
    id: "card-grid",
    className: "card-grid",
  });

  // Create buttons
  const randomizeBtn = createMockElement("button", {
    id: "randomize-btn",
    textContent: "Randomize",
  });

  const flipAllBtn = createMockElement("button", {
    id: "flip-all-btn",
    textContent: "Show Points",
  });

  const toggleSwitch = createMockElement("input", {
    id: "toggle-names-switch",
    type: "checkbox",
    checked: "true",
  });

  // Append elements
  container.appendChild(cardGrid);
  container.appendChild(randomizeBtn);
  container.appendChild(flipAllBtn);
  container.appendChild(toggleSwitch);
  document.body.appendChild(container);

  return {
    container,
    cardGrid,
    randomizeBtn,
    flipAllBtn,
    toggleSwitch,
  };
}

/**
 * Wait for animation to complete
 * @param {number} duration - Animation duration in ms
 * @returns {Promise} Promise that resolves after duration
 */
export function waitForAnimation(duration = 600) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * Simulate click event
 * @param {HTMLElement} element - Element to click
 */
export function simulateClick(element) {
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(event);
}

/**
 * Simulate change event
 * @param {HTMLElement} element - Element to change
 * @param {*} value - New value
 */
export function simulateChange(element, value) {
  element.checked = value;
  const event = new Event("change", {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
}
