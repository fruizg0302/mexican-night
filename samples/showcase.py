"""
Mexican Night Theme - Python Showcase
Demonstrates vibrant syntax highlighting
"""

from typing import List, Optional
from datetime import datetime
import asyncio


class MexicanNightTheme:
    """A vibrant VS Code theme inspired by Mexico City nights."""

    COLORS = {
        'rosa_mexicano': '#E4007C',
        'verde_mexicano': '#006341',
        'neon_yellow': '#FFD60A'
    }

    def __init__(self, name: str, version: str = "1.0.0"):
        self.name = name
        self.version = version
        self._downloads = 0

    @property
    def downloads(self) -> int:
        """Get total download count."""
        return self._downloads

    @staticmethod
    def get_color_palette() -> dict:
        """Return the theme's color palette."""
        return MexicanNightTheme.COLORS

    async def fetch_stats(self) -> Optional[dict]:
        """Fetch theme statistics asynchronously."""
        try:
            await asyncio.sleep(1)
            stats = {
                'name': self.name,
                'downloads': self._downloads,
                'rating': 4.9
            }
            return stats
        except Exception as e:
            print(f"Error fetching stats: {e}")
            return None

    def format_info(self, extended: bool = False) -> str:
        """Format theme information with f-strings."""
        base_info = f"🌃 {self.name} v{self.version}"

        if extended:
            colors = len(self.COLORS)
            return f"{base_info} | {colors} colors | {self._downloads:,} downloads"

        return base_info


# Create theme instance and display info
theme = MexicanNightTheme("Mexican Night", "0.0.1")
print(theme.format_info(extended=True))

# Demonstrate list comprehension
vibrant_colors = [color for color in theme.COLORS.values() if color.startswith('#')]

# Show conditional logic
if theme.downloads > 1000:
    print("🎉 Popular theme!")
elif theme.downloads > 100:
    print("📈 Growing theme!")
else:
    print("🆕 New theme - try it out!")
