#!/bin/bash

# Change to the audioFE directory
cd audioFE

# Check if there are any processes already using ports 8080 and 8081
echo "Checking if ports 8080 and 8081 are in use..."
PORTS_IN_USE=$(lsof -i :8080 -i :8081 2>/dev/null)

if [ ! -z "$PORTS_IN_USE" ]; then
    echo "Warning: Ports already in use. Here are the processes:"
    echo "$PORTS_IN_USE"
    
    read -p "Do you want to kill these processes? (y/n): " KILL_PROCESSES
    
    if [[ "$KILL_PROCESSES" == "y" || "$KILL_PROCESSES" == "Y" ]]; then
        echo "Killing processes..."
        lsof -i :8080 -i :8081 | grep LISTEN | awk '{print $2}' | xargs kill -9
        echo "Processes killed."
    else
        echo "Please free up ports 8080 and 8081 before starting the application."
        exit 1
    fi
fi

# Start the application
echo "Starting the application..."
npm run start

echo "Application started. You can access it at:"
echo "- Main application: http://localhost:8080/"
echo "- MIDIano player: http://localhost:8080/midiano/index.html" 