#!/usr/bin/env fish

# Clean up any existing containers
echo "Cleaning up any existing containers..."
docker compose down

# Remove any cached images to ensure a clean build
echo "Removing cached images..."
docker compose rm -f

# Force rebuild the container
echo "Building the container..."
docker compose build --no-cache

# Run the container without volume mounting
echo "Starting the container..."
docker compose up -d

# Check if container started successfully
if test $status -eq 0
    set LOCAL_IP (ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n 1 | awk '{print $2}')
    echo "Container started successfully!"
    echo "Make sure you are on the same network. You can access the game at: http://192.168.9.3:9080"
    echo ""
    echo "To stop the container, run: docker compose down"
else
    echo "Error starting container. Please check the Docker logs:"
    docker compose logs
end
