import lyricsgenius
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the access token
ACCESS_TOKEN = os.getenv("LG_CLIENT_ACCESS_TOKEN")

genius = lyricsgenius.Genius(ACCESS_TOKEN)
artist = genius.search_artist("Ariana Grande", max_songs=3, sort="title")
print(artist.songs)
