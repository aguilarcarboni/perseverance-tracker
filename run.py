#!/usr/bin/env python3
import typer
import requests as rq
import numpy as np
import pandas as pd
from rich.live import Live
from rich.layout import Layout
from rich.panel import Panel
from rich.console import Console
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import box
from datetime import datetime
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
NASA_API_KEY = os.getenv('NASA_API_KEY', 'kQwoyoXi4rQeY0lXWt1RZln6mLeatlYKLmYfGENB')

app = typer.Typer(help="Mars Perseverance Rover Dashboard")
console = Console()

class MarsDashboard:
    def __init__(self):
        self.layout = Layout()
        self.setup_layout()
        self.manifest_url = f'https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance/?api_key={NASA_API_KEY}'
        self.waypoints_url = 'https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json'
        self.refresh_data()

    def setup_layout(self):
        self.layout.split(
            Layout(name="header", size=3),
            Layout(name="main", size=36),
            Layout(name="footer", size=3)
        )
        
        self.layout["main"].split_row(
            Layout(name="left", ratio=1),
            Layout(name="right", ratio=1),
        )
        
        self.layout["left"].split(
            Layout(name="stats", ratio=1),
            Layout(name="images", ratio=2),
        )
        
        self.layout["right"].split(
            Layout(name="location", ratio=1),
            Layout(name="distance", ratio=1),
        )

    def get_manifest_data(self):
        response = rq.get(self.manifest_url)
        return response.json()['photo_manifest']

    def get_sol(self, manifest_data):
        return manifest_data['max_sol']

    def get_images(self, sol):
        images_url = f'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol={sol}&api_key={NASA_API_KEY}'
        return rq.get(images_url).json()['photos']

    def get_waypoints(self):
        coords = []
        response = rq.get(self.waypoints_url)
        coords_json = response.json()['features']
        
        for feature in coords_json:
            coords.append({
                'lon': float(feature['properties']['lon']),
                'lat': float(feature['properties']['lat']),
                'sol': int(feature['properties']['sol'])
            })
        return coords

    def generate_header(self):
        return Panel(
            "[bold blue]Mars Perseverance Rover Dashboard[/bold blue]",
            style="white on blue",
            box=box.DOUBLE
        )

    def generate_stats_panel(self, manifest_data):
        stats_table = Table.grid()
        stats_table.add_column("Stat", style="cyan")
        stats_table.add_column("Value", style="green")
        
        stats_table.add_row("Launch Date", manifest_data['launch_date'])
        stats_table.add_row("Landing Date", manifest_data['landing_date'])
        stats_table.add_row("Current Sol", str(manifest_data['max_sol']))
        stats_table.add_row("Total Photos", str(manifest_data['total_photos']))
        stats_table.add_row("Status", manifest_data['status'].upper())
        
        return Panel(
            stats_table,
            title="Mission Statistics",
            border_style="cyan",
            box=box.ROUNDED
        )

    def generate_images_panel(self, images):
        images_table = Table(show_header=True, header_style="bold magenta")
        images_table.add_column("Camera")
        images_table.add_column("Earth Date")
        images_table.add_column("Sol")
        
        for image in images[:5]:  # Show last 5 images
            images_table.add_row(
                image['camera']['full_name'],
                image['earth_date'],
                str(image['sol'])
            )
        
        return Panel(
            images_table,
            title="Latest Images",
            border_style="magenta",
            box=box.ROUNDED
        )

    def generate_location_panel(self, coordinates):
        location_table = Table(show_header=True, header_style="bold yellow")
        location_table.add_column("Sol")
        location_table.add_column("Latitude")
        location_table.add_column("Longitude")
        
        for coord in coordinates[-5:]:  # Show last 5 locations
            location_table.add_row(
                str(coord['sol']),
                f"{coord['lat']:.4f}",
                f"{coord['lon']:.4f}"
            )
        
        return Panel(
            location_table,
            title="Recent Locations",
            border_style="yellow",
            box=box.ROUNDED
        )

    def generate_footer(self):
        return Panel(
            f"Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Press Ctrl+C to exit",
            style="white on blue",
            box=box.DOUBLE
        )

    def refresh_data(self):
        self.manifest_data = self.get_manifest_data()
        self.current_sol = self.get_sol(self.manifest_data)
        self.images = self.get_images(self.current_sol)
        self.coordinates = self.get_waypoints()

    def update_dashboard(self):
        # Update header
        self.layout["header"].update(self.generate_header())
        
        # Update main panels
        self.layout["stats"].update(self.generate_stats_panel(self.manifest_data))
        self.layout["images"].update(self.generate_images_panel(self.images))
        self.layout["location"].update(self.generate_location_panel(self.coordinates))
        
        # Update footer
        self.layout["footer"].update(self.generate_footer())

@app.command()
def main():
    """
    Launch the Mars Perseverance Rover Dashboard
    """
    dashboard = MarsDashboard()
    
    with Live(dashboard.layout, refresh_per_second=1, screen=True):
        try:
            while True:
                dashboard.refresh_data()
                dashboard.update_dashboard()
                time.sleep(60)  # Update every minute
        except KeyboardInterrupt:
            console.print("[bold red]Shutting down dashboard...[/bold red]")

if __name__ == "__main__":
    app() 