// Game configuration
const config = {
  numberOfCards: 11, // Changed to 11 to match the number of specified colors
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
  possiblePoints: [1, 2, 3, 5, "Point Reset"],
};

// Utility function to determine if text should be black or white based on background color
function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance - modern approach based on human perception
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// DOM elements
const cardGrid = document.getElementById("card-grid");
const randomizeBtn = document.getElementById("randomize-btn");
const flipAllBtn = document.getElementById("flip-all-btn");
const toggleNamesSwitch = document.getElementById("toggle-names-switch");

// Game state
let areNamesVisible = true;

// Card data structure
let cards = [];

// Initialize the game
function initGame() {
  // Clear existing cards
  cardGrid.innerHTML = "";
  cards = [];

  // Shuffle the colors array
  const shuffledColors = [...config.colors];
  shuffleArray(shuffledColors);

  // Create points distribution according to rules
  const pointsDistribution = createPointsDistribution();

  // Generate new cards
  for (let i = 0; i < config.numberOfCards; i++) {
    const card = createCard(shuffledColors[i], pointsDistribution[i]);
    cards.push(card);
    cardGrid.appendChild(card.element);
  }
}

// Create a balanced distribution of points following the rules
function createPointsDistribution() {
  // Create an array with regular point values (1, 2, 3)
  const regularPoints = [1, 2, 3];

  // We need 9 regular point cards (11 total - 1 "5 points" - 1 "Point Reset")
  let pointsArray = [];

  // Fill array with regular points (1, 2, 3) distributed evenly
  while (pointsArray.length < config.numberOfCards - 2) {
    pointsArray = [...pointsArray, ...regularPoints];
  }

  // Trim to exact number needed
  pointsArray = pointsArray.slice(0, config.numberOfCards - 2);

  // Add one "5 points" card and one "Point Reset" card
  pointsArray.push(5);
  pointsArray.push("Point Reset");

  // Shuffle the points array
  shuffleArray(pointsArray);

  return pointsArray;
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create a single card
function createCard(colorInfo, points) {
  // Create card elements
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  cardFront.style.backgroundColor = colorInfo.value;

  const cardTitle = document.createElement("div");
  cardTitle.className = "card-title";
  cardTitle.textContent = colorInfo.name;

  // Set text color based on background color for optimal contrast
  const textColor = getContrastColor(colorInfo.value);
  cardTitle.style.color = textColor;

  // Conditionally add or remove text shadow based on the contrast
  if (textColor === "#FFFFFF") {
    // Keep shadow for white text on dark backgrounds
    cardTitle.style.textShadow = "1px 1px 3px rgba(0, 0, 0, 0.7)";
  } else {
    // Remove shadow for black text on light backgrounds
    cardTitle.style.textShadow = "none";
  }

  cardFront.appendChild(cardTitle);

  const cardBack = document.createElement("div");
  cardBack.className = "card-back";

  const pointsElement = document.createElement("div");
  pointsElement.className = "points";
  pointsElement.textContent =
    points === "Point Reset" ? "Point Reset" : points + " Points";

  cardBack.appendChild(pointsElement);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  // Add click event to flip card
  cardElement.addEventListener("click", () => {
    card.flip(); // Use the flip method to ensure the flipped property is updated
  });

  // Create card object
  const card = {
    element: cardElement,
    color: colorInfo.value,
    colorName: colorInfo.name,
    points,
    flipped: false,
    flip: function () {
      this.flipped = !this.flipped;
      this.element.classList.toggle("flipped");
    },
    updateCard: function (newColorInfo, newPoints) {
      this.color = newColorInfo.value;
      this.colorName = newColorInfo.name;
      this.points = newPoints;

      const frontSide = this.element.querySelector(".card-front");
      const colorTitle = this.element.querySelector(".card-title");
      const pointsElement = this.element.querySelector(".points");

      frontSide.style.backgroundColor = newColorInfo.value;
      colorTitle.textContent = newColorInfo.name;

      // Update text color for optimal contrast when color changes
      const textColor = getContrastColor(newColorInfo.value);
      colorTitle.style.color = textColor;

      // Conditionally add or remove text shadow based on the contrast
      if (textColor === "#FFFFFF") {
        // Keep shadow for white text on dark backgrounds
        colorTitle.style.textShadow = "1px 1px 3px rgba(0, 0, 0, 0.7)";
      } else {
        // Remove shadow for black text on light backgrounds
        colorTitle.style.textShadow = "none";
      }

      pointsElement.textContent =
        newPoints === "Point Reset" ? "Point Reset" : newPoints + " Points";
    },
  };

  // Return the card object
  return card;
}

// Randomize all cards
function randomizeCards() {
  // First step: Make sure all cards show their color side (not points)
  const flippedCards = cards.filter((card) => card.flipped);

  // If there are any flipped cards, flip them back first, then randomize
  if (flippedCards.length > 0) {
    // Flip all cards to show color side
    flippedCards.forEach((card) => card.flip());

    // Wait a short moment for the flip animation to complete
    setTimeout(() => {
      // Then perform the randomization
      performRandomization();
    }, 600); // Wait for flip animation to complete
  } else {
    // No cards are flipped, randomize immediately
    performRandomization();
  }
}

// Helper function to perform the actual randomization
function performRandomization() {
  // Shuffle the colors array
  const shuffledColors = [...config.colors];
  shuffleArray(shuffledColors);

  // Create new points distribution
  const pointsDistribution = createPointsDistribution();

  // Update all cards with new colors and points
  cards.forEach((card, index) => {
    card.updateCard(shuffledColors[index], pointsDistribution[index]);
  });
}

// Flip all cards
function flipAllCards() {
  cards.forEach((card) => {
    if (!card.flipped) {
      card.flip();
    }
  });
}

// Toggle visibility of color names
function toggleColorNames() {
  areNamesVisible = toggleNamesSwitch.checked;

  if (areNamesVisible) {
    cardGrid.classList.remove("hide-names");
  } else {
    cardGrid.classList.add("hide-names");
  }
}

// Event listeners
randomizeBtn.addEventListener("click", randomizeCards);
flipAllBtn.addEventListener("click", flipAllCards);
toggleNamesSwitch.addEventListener("change", toggleColorNames);

// Initialize the game when the page loads
window.addEventListener("DOMContentLoaded", initGame);
