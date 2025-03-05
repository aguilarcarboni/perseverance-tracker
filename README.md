# Mars Perseverance Rover Dashboard 🚀

A beautiful command-line interface dashboard that displays real-time data from NASA's Perseverance Mars Rover, including mission statistics, latest images, and location tracking.

## Features

- 📊 Real-time mission statistics
- 📸 Latest images from the rover
- 🗺️ Location tracking with coordinates
- 🔄 Auto-refreshing data (every 60 seconds)
- 🎨 Beautiful terminal UI with rich colors and layouts

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd perseverance-tracker
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage
```

2. Run the dashboard:
```bash
python mars_dashboard.py
```

3. The dashboard will automatically update every minute. Press `Ctrl+C` to exit.

## Data Sources

- NASA Mars Rover Photos API
- Mars MMGIS Waypoints Data

## Requirements

- Python 3.8+
- See `requirements.txt` for package dependencies
