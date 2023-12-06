import lyricsgenius
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the access token
ACCESS_TOKEN = os.getenv("CLIENT_ACCESS_TOKEN")

genius = lyricsgenius.Genius(ACCESS_TOKEN)
#artist = genius.search_artist("Ariana Grande")

def get_song_from_artist(artist: str, title: str):
    song = genius.search_song(title, artist)
    print(song.lyrics)
    print(song.title)
    print(song.artist)
    return song.lyrics

get_song_from_artist("Ariana grand", "7 rings")
#print(artist.songs)
