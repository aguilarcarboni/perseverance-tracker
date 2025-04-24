#!/usr/bin/env python3
import typer
import requests as rq
from rich.live import Live
from rich.layout import Layout
from rich.panel import Panel
from rich.console import Console
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import box
from rich.text import Text
from datetime import datetime
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
NASA_API_KEY = os.getenv('NASA_API_KEY', 'kQwoyoXi4rQeY0lXWt1RZln6mLeatlYKLmYfGENB')

app = typer.Typer(help="Mars Perseverance Rover Terminal Interface")
console = Console()

# --- ASCII Art ---
HEADER_ART = """
██████╗ ███████╗██████╗ ███████╗███████╗██╗   ██╗███████╗██████╗  █████╗ ███╗   ██╗ ██████╗███████╗████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██║   ██║██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
██████╔╝█████╗  ██████╔╝███████╗█████╗  ██║   ██║█████╗  ██████╔╝███████║██╔██╗ ██║██║     █████╗     ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║     ███████╗██║  ██║███████║███████╗ ╚████╔╝ ███████╗██║  ██║██║  ██║██║ ╚████║╚██████╗███████╗   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
"""

# Define Mars colors
MARS_RED = "rgb(153,27,30)"
MARS_ORANGE = "rgb(255,140,0)"
MARS_YELLOW = "rgb(255,215,0)"
MARS_BROWN = "rgb(139,69,19)"
MARS_DARK = "rgb(40,40,40)"

class MarsDashboard:
    def __init__(self, map_size=(15, 30)):
        self.layout = Layout()
        self.setup_layout()
        self.manifest_url = f'https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance/?api_key={NASA_API_KEY}'
        self.waypoints_url = 'https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json'
        self.map_height = map_size[0]
        self.map_width = map_size[1]
        self.refresh_data()

    def setup_layout(self):
        self.layout.split(
            Layout(name="header", size=9),
            Layout(name="main", size=35),
            Layout(name="footer", size=3)
        )

        self.layout["main"].split_row(
            Layout(name="left", ratio=1),
            Layout(name="right", ratio=1),
        )

        self.layout["left"].split(
            Layout(name="stats", ratio=1),
            Layout(name="images", ratio=1),
            Layout(name="timeline", ratio=1),
        )

        self.layout["right"].split(
            Layout(name="location", ratio=1),
            Layout(name="map", ratio=1),
            Layout(name="cameras", ratio=1),
        )

    def get_manifest_data(self):
        try:
            response = rq.get(self.manifest_url, timeout=10)
            response.raise_for_status()
            return response.json()['photo_manifest']
        except rq.exceptions.RequestException as e:
            console.print(f"[bold red]Error fetching manifest data: {e}[/]")
            return None

    def get_sol(self, manifest_data):
        return manifest_data.get('max_sol', 'N/A') if manifest_data else 'N/A'

    def get_images(self, sol):
        if sol == 'N/A': return []
        try:
            base_url = f'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos'
            params = {
                'api_key': NASA_API_KEY,
                'sol': sol
            }
            response = rq.get(base_url, params=params, timeout=15)
            response.raise_for_status()
            return response.json().get('photos', [])[:5]  # Show only last 5 images
        except rq.exceptions.RequestException as e:
            console.print(f"[bold red]Error fetching images: {e}[/]")
            return []

    def get_waypoints(self):
        coords = []
        try:
            response = rq.get(self.waypoints_url, timeout=10)
            response.raise_for_status()
            coords_json = response.json().get('features', [])

            for feature in coords_json:
                props = feature.get('properties', {})
                lon = props.get('lon')
                lat = props.get('lat')
                sol = props.get('sol')
                if lon is not None and lat is not None and sol is not None:
                    try:
                        coords.append({
                            'lon': float(lon),
                            'lat': float(lat),
                            'sol': int(sol)
                        })
                    except (ValueError, TypeError):
                        console.print(f"[yellow]Warning: Skipping waypoint with invalid data: {props}[/]")

            coords.sort(key=lambda x: x['sol'])
            return coords

        except rq.exceptions.RequestException as e:
            console.print(f"[bold red]Error fetching waypoints: {e}[/]")
            return []

    def generate_header(self):
        header_text = Text(HEADER_ART, style=f"bold {MARS_RED}", justify="center")
        sub_header = Text("Perseverance Rover - Live Data Feed", style=f"bold {MARS_ORANGE}", justify="center")
        return Panel(
            Text.assemble(header_text, "\n", sub_header),
            border_style=MARS_RED,
            box=box.HEAVY_HEAD
        )

    def generate_stats_panel(self, manifest_data):
        stats_table = Table.grid(padding=(0, 2))
        stats_table.add_column("Stat", style=MARS_ORANGE, justify="right")
        stats_table.add_column("Value", style=MARS_YELLOW)

        if manifest_data:
            stats_table.add_row("Launch Date :", manifest_data.get('launch_date', 'N/A'))
            stats_table.add_row("Landing Date :", manifest_data.get('landing_date', 'N/A'))
            stats_table.add_row("Current Sol :", str(manifest_data.get('max_sol', 'N/A')))
            stats_table.add_row("Total Photos :", str(manifest_data.get('total_photos', 'N/A')))
            stats_table.add_row("Status :", manifest_data.get('status', 'N/A').upper())
        else:
            stats_table.add_row("Data :", "[red]Unavailable[/]")

        return Panel(
            stats_table,
            title=f"[bold {MARS_ORANGE}]MISSION STATS[/]",
            border_style=MARS_ORANGE,
            box=box.ROUNDED
        )

    def generate_images_panel(self, images):
        images_table = Table(show_header=True, header_style=f"bold {MARS_RED}", box=box.SIMPLE_HEAD, padding=(0, 1))
        images_table.add_column("Camera")
        images_table.add_column("Earth Date")
        images_table.add_column("Sol")

        for image in reversed(images):
            images_table.add_row(
                image['camera']['full_name'],
                image['earth_date'],
                str(image['sol'])
            )

        return Panel(
            images_table,
            title=f"[bold {MARS_RED}]RECENT IMAGES[/]",
            border_style=MARS_RED,
            box=box.SQUARE
        )

    def generate_location_panel(self, coordinates):
        location_table = Table(show_header=True, header_style=f"bold {MARS_BROWN}", box=box.SIMPLE_HEAD, padding=(0, 1))
        location_table.add_column("Sol")
        location_table.add_column("Latitude")
        location_table.add_column("Longitude")

        for coord in coordinates[-5:]:
            location_table.add_row(
                str(coord['sol']),
                f"{coord['lat']:.4f}",
                f"{coord['lon']:.4f}"
            )

        return Panel(
            location_table,
            title=f"[bold {MARS_BROWN}]POSITION LOG[/]",
            border_style=MARS_BROWN,
            box=box.SQUARE
        )

    def generate_map_panel(self, coordinates):
        if not coordinates:
            return Panel("[grey50]No waypoint data for map.[/]", title=f"[bold {MARS_RED}]TRAJECTORY MAP[/]", border_style=MARS_RED, box=box.ASCII)

        map_points = coordinates
        if not map_points:
            return Panel("[grey50]Insufficient waypoints for map.[/]", title=f"[bold {MARS_RED}]TRAJECTORY MAP[/]", border_style=MARS_RED, box=box.ASCII)

        lats = [p['lat'] for p in map_points]
        lons = [p['lon'] for p in map_points]

        min_lat, max_lat = min(lats), max(lats)
        min_lon, max_lon = min(lons), max(lons)

        lat_range = max_lat - min_lat if max_lat > min_lat else 1
        lon_range = max_lon - min_lon if max_lon > min_lon else 1

        grid = [[Text('.', style=MARS_DARK) for _ in range(self.map_width)] for _ in range(self.map_height)]

        for i, p in enumerate(map_points):
            y = self.map_height - 1 - int(((p['lat'] - min_lat) / lat_range) * (self.map_height - 1))
            x = int(((p['lon'] - min_lon) / lon_range) * (self.map_width - 1))

            y = max(0, min(self.map_height - 1, y))
            x = max(0, min(self.map_width - 1, x))

            if i == len(map_points) - 1:
                grid[y][x] = Text('R', style=f"bold {MARS_RED}")
            else:
                if grid[y][x].plain == '.':
                    grid[y][x] = Text('*', style=MARS_ORANGE)

        map_text = Text("\n").join(Text("").join(cell for cell in row) for row in grid)

        return Panel(
            map_text,
            title=f"[bold {MARS_RED}]TRAJECTORY MAP[/]",
            border_style=MARS_RED,
            box=box.ASCII
        )

    def generate_timeline_panel(self, manifest_data):
        if not manifest_data:
            return Panel("[grey50]No timeline data available.[/]", title=f"[bold {MARS_ORANGE}]MISSION TIMELINE[/]", border_style=MARS_ORANGE, box=box.SQUARE)

        timeline_table = Table(show_header=True, header_style=f"bold {MARS_ORANGE}", box=box.SIMPLE_HEAD, padding=(0, 1))
        timeline_table.add_column("Event")
        timeline_table.add_column("Date")
        timeline_table.add_column("Sol")

        timeline_table.add_row(
            "Launch",
            manifest_data.get('launch_date', 'N/A'),
            "0"
        )
        timeline_table.add_row(
            "Landing",
            manifest_data.get('landing_date', 'N/A'),
            "0"
        )
        timeline_table.add_row(
            "Latest Data",
            manifest_data.get('max_date', 'N/A'),
            str(manifest_data.get('max_sol', 'N/A'))
        )

        return Panel(
            timeline_table,
            title=f"[bold {MARS_ORANGE}]MISSION TIMELINE[/]",
            border_style=MARS_ORANGE,
            box=box.SQUARE
        )

    def generate_camera_stats_panel(self, manifest_data):
        if not manifest_data or 'photos' not in manifest_data:
            return Panel("[grey50]No camera data available.[/]", title=f"[bold {MARS_BROWN}]CAMERA STATS[/]", border_style=MARS_BROWN, box=box.SQUARE)

        camera_stats = {}
        total_photos = 0
        
        for photo_entry in manifest_data['photos']:
            for camera in photo_entry.get('cameras', []):
                if camera not in camera_stats:
                    camera_stats[camera] = 0
                camera_stats[camera] += photo_entry.get('total_photos', 0)
            total_photos += photo_entry.get('total_photos', 0)

        camera_table = Table(show_header=True, header_style=f"bold {MARS_BROWN}", box=box.SIMPLE_HEAD, padding=(0, 1))
        camera_table.add_column("Camera")
        camera_table.add_column("Photos")
        camera_table.add_column("%")

        sorted_cameras = sorted(camera_stats.items(), key=lambda x: x[1], reverse=True)
        
        for camera, count in sorted_cameras:
            percentage = (count / total_photos * 100) if total_photos > 0 else 0
            camera_table.add_row(
                camera,
                str(count),
                f"{percentage:.1f}%"
            )

        return Panel(
            camera_table,
            title=f"[bold {MARS_BROWN}]CAMERA STATS[/]",
            border_style=MARS_BROWN,
            box=box.SQUARE
        )

    def generate_footer(self):
        return Panel(
            f"Last Update: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | CTRL+C to EXIT",
            style=f"white on {MARS_RED}",
            box=box.HEAVY_EDGE
        )

    def refresh_data(self):
        with Progress(
            SpinnerColumn(spinner_name="dots", style="green"),
            TextColumn("[progress.description]{task.description}", style="cyan"),
            transient=True,
        ) as progress:
            task_manifest = progress.add_task("Fetching manifest...", total=1)
            task_images = progress.add_task("Fetching images...", total=1)
            task_waypoints = progress.add_task("Fetching waypoints...", total=1)

            self.manifest_data = self.get_manifest_data()
            progress.update(task_manifest, completed=1)

            self.current_sol = self.get_sol(self.manifest_data)
            self.images = self.get_images(self.current_sol)
            progress.update(task_images, completed=1)

            self.coordinates = self.get_waypoints()
            progress.update(task_waypoints, completed=1)

    def update_dashboard(self):
        self.layout["header"].update(self.generate_header())
        self.layout["stats"].update(self.generate_stats_panel(self.manifest_data))
        self.layout["images"].update(self.generate_images_panel(self.images))
        self.layout["location"].update(self.generate_location_panel(self.coordinates))
        self.layout["map"].update(self.generate_map_panel(self.coordinates))
        self.layout["timeline"].update(self.generate_timeline_panel(self.manifest_data))
        self.layout["cameras"].update(self.generate_camera_stats_panel(self.manifest_data))
        self.layout["footer"].update(self.generate_footer())

@app.command()
def main(refresh_rate: int = typer.Option(60, "--refresh", "-r", help="Refresh interval in seconds.")):
    """
    Launch the Mars Perseverance Rover Terminal Interface
    """
    dashboard = MarsDashboard()

    console.clear()
    console.print("[bold green]Initializing NASA M20 Data Feed...[/]")
    dashboard.refresh_data()
    console.clear()

    with Live(dashboard.layout, refresh_per_second=4, screen=True, transient=True) as live:
        try:
            dashboard.update_dashboard()
            while True:
                time.sleep(refresh_rate)
                dashboard.refresh_data()
                dashboard.update_dashboard()
                console.clear()
        except KeyboardInterrupt:
            console.clear()
            console.print("[bold yellow]...Termination Signal Received. Shutting Down M20 Feed...[/]")
            time.sleep(1)
            console.clear()

if __name__ == "__main__":
    app() 