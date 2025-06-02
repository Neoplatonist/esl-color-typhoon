# Color Point Game

A simple card-based memory game built with HTML, CSS, and JavaScript.

## Running with Docker

### Prerequisites

- Docker installed on your machine
- Docker Compose (included with Docker Desktop)

### Running the Game

1. Open a terminal and navigate to the game directory:

   ```
   cd /path/to/color-point-game
   ```

2. Build and start the Docker container:

   ```
   docker-compose up -d
   ```

3. Access the game:
   - On your computer: http://localhost:8080
   - On other devices (including iPad): http://YOUR_COMPUTER_IP:8080
     (Replace YOUR_COMPUTER_IP with your computer's IP address on the network)

### Finding Your Computer's IP Address

On macOS:

```
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Look for the IP address that starts with 192.168.x.x or 10.x.x.x.

### Stopping the Game

To stop the Docker container:

```
docker-compose down
```

## Playing on iPad

1. Make sure your iPad is connected to the same WiFi network as your computer
2. Open Safari on your iPad
3. Enter the URL: http://YOUR_COMPUTER_IP:8080
4. For easier access, you can add the game to your iPad Home Screen:
   - Tap the Share button
   - Select "Add to Home Screen"
   - Name it "Color Point Game" and tap "Add"

## Game Rules

- Each card shows a color with its name
- When clicked, cards flip to reveal point values
- Only one card has 10 points
- Only one card has "No Points"
- Use "Randomize Colors & Points" to shuffle the game
- Use "Flip All Cards" to reveal all point values at once
