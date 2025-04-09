# MusicXML and MIDI Player Application

A comprehensive web-based application for playing and visualizing musical scores in both MusicXML and MIDI formats.

## Overview

This application provides two integrated players:
1. **MusicXML Player** - For playing and visualizing MusicXML sheet music with soundfont support
2. **MIDIano MIDI Player** - For MIDI file playback with piano roll visualization

## Features

### MusicXML Player
- Upload and play MusicXML files (.musicxml, .mxl, .xml)
- Sample scores included
- Instrument selection from 128 General MIDI instruments
- Tempo, pitch, and tuning controls
- Beautiful sheet music rendering
- PDF score conversion capabilities

### MIDIano MIDI Player
- Upload and play MIDI files with piano roll visualization
- Falling notes display with accurate timing
- Playback controls with speed adjustment
- Customizable appearance settings
- Keyboard visualization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/musicxml-midi-player.git
cd musicxml-midi-player
```

2. Install dependencies:
```
cd audioFE
npm install
```

## Running the Application

Start the application with:

```
cd audioFE
npm run start
```

This will start the web server on port 8080. The application will be accessible at:
- Main application: http://localhost:8080/
- MIDIano player: http://localhost:8080/midiano/index.html

## Usage

### MusicXML Player (Home)
1. Open http://localhost:8080/ in your web browser
2. Upload a MusicXML file using the "Upload MusicXML File" button or select one of the sample scores
3. Use the playback controls at the bottom to play, pause, and rewind
4. Adjust tempo, pitch, and tuning as needed
5. Select different instruments from the dropdown menu

### MIDIano Player
1. Click on "MIDI Player" in the navigation menu
2. Upload a MIDI file using the "Upload MIDI" button
3. Use the playback controls to control playback
4. Adjust settings using the settings panel
5. Return to the main application using the "Back to Home" button

## Converting PDF Scores
1. In the main application, use the "Convert Score to MusicXML" section
2. Upload a PDF or image of sheet music
3. Click "Convert Score"
4. Wait for the conversion to complete
5. The converted score will automatically load into the player

## Technical Details

The application consists of two main components:
1. **MusicXML Player**: Built with custom JavaScript renderer and SoundFont support
2. **MIDIano Player**: Integrated from [MIDIano GitHub repository](https://github.com/mageh21/midi_plyaer)

The application uses a simple web server (ws) to serve both components from the same port.

## Server Configuration

The application runs two server instances:
- Demo server on port 8080: `ws -d demo --rewrite /mma/(.*) -> http://localhost:3000/$1 -p 8080`
- Mobile server on port 8081: `ws -d src/mobile -p 8081`

## Troubleshooting

### Port already in use
If you see "EADDRINUSE" errors when starting the application, it means the ports are already in use. You can:
1. Kill existing processes:
```
lsof -i :8080 -i :8081 | grep LISTEN
kill -9 [PID]  # Replace [PID] with the process IDs from the output above
```
2. Or change the port in the start script

### Audio not playing
1. Make sure your browser is not muted
2. Try clicking on the page first (some browsers require user interaction before playing audio)
3. Check browser console for errors

### MIDI Player not loading
1. Ensure you have correctly set up the MIDIano player files
2. Check the browser console for any JavaScript errors
3. Try refreshing the page

## License

This project incorporates:
- The MIDIano player (https://github.com/mageh21/midi_plyaer)
- Custom MusicXML player

## Credits

- MIDIano MIDI Player: Created by [mageh21](https://github.com/mageh21/midi_plyaer)
- MusicXML Player: Custom implementation for audio playback of MusicXML files 