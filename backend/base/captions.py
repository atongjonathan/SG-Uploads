import os
from urllib.parse import quote
from opensubtitlescom import OpenSubtitles
import requests
from telebot import TeleBot
from datetime import datetime
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup
import logging
import json

bot = TeleBot(os.environ.get("TELEGRAM_BOT_TOKEN"))
caption_bot = TeleBot(os.environ.get("TELEGRAM_BOT_TOKEN"))

API_KEY = 'cfFSE7qyg28tIEDztRg6j3oqxLvnS0oK'
USER = 'atongjona'
PASSWORD = 'selisrare'
GROUP_CHAT_ID = -1001803549934
TELEGRAM_BOT_TOKEN = '6726476385:AAFCpAcbxZ-RLuUYIWhaW75TD22Tpl5teRo'
bot = TeleBot(TELEGRAM_BOT_TOKEN)
caption_bot = TeleBot('6453092959:AAH65NtLGOXgR3F6Ak30FXCN1tguOnxQpZA')

PHONE_NUMBER_ID = "379940855196731"
ACCESS_TOKEN = "EAAOaHvjwayUBO1ygAsZAwOzWEL6i7NsJeXxInyFZC0f145YZAgir8eqALUSU5t7EMUhVkN3hn216UlnV9WLUQj6hOaZBoLe2d5KZAWvGFoK49RYeYYth8Xus0ZCLjL0A1ZBmGq4kHwv3ZALl4P0o8V5PS2CdJYFLDetaOCBjuqeLgmc9cpbzyo0966F7eO5la4gFTxhoNcZArhFl3vFne"
recipients = "254708683896"


class Captions():

    def __init__(self) -> None:
        self.subtitles = OpenSubtitles("sguploads v1.0.0", API_KEY)

    def download(self, first_subtitle):
        try:
            # Download the subtitle in WebVTT format
            srt_content = self.subtitles.download(
                file_id=first_subtitle["files"][0]["file_id"], sub_format="webvtt")

            filename = f"{first_subtitle.get('release')[:51]}.webvtt"
            with open(filename, 'wb') as file:
                file.write(srt_content)
            return filename
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}

    def search(self, imdb_id):
        try:

            self.subtitles.login(USER, PASSWORD)

            # Search for subtitles
            response = self.subtitles.search(
                imdb_id=imdb_id, languages="en", trusted_sources=True)
            response_dict = response.to_dict()
            # Ensure 'data' is a list
            response_data = response_dict.get("data", [])
            if not isinstance(response_data, list):
                return {"error": "'data' field is not a list as expected"}

            if not response_data:
                return {"error": "No subtitles found"}

            return response_data
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}

        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}

    def send_to_tg(self, telegram_id, file_path):

        try:
            # Send the file to Telegram
            with open(file_path, 'rb') as file:
                message = caption_bot.send_document(telegram_id, file)
            os.remove(file_path)
            return message.id
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}

    def update_group(self, movie):
        keyboard = InlineKeyboardMarkup()
        # Use `movie.get('stream', '#')` to prevent errors
        button = InlineKeyboardButton(
            "🎬 Watch now",  url=f"https://movies.atongjona.com/watch/{movie.get('id')}")
        keyboard.add(button)

        try:
            release_date = movie.get('releaseDetailed', {}).get('date', 'N/A')
            release_date = datetime.strptime(
                release_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d-%m-%Y") if release_date != 'N/A' else 'N/A'
        except Exception as e:
            release_date = 'N/A'
            print(f"Error parsing release date: {e}")

        # Format the movie details text
        movie_text = f"""
📹<b>Title:</b> <a href="{movie.get('link', '#')}"> {movie.get('title', 'N/A')}</a>
🕰 <b>Duration:</b> {movie.get('runtime', 'N/A')}
📉 <b>Rating:</b> {movie.get('rating', {}).get('star', 'N/A')}⭐️ from {movie.get('rating', {}).get('count', 0)} users
🗓️ <b>Release Date:</b> {release_date}
📟 <b>Genre:</b> {', '.join(movie.get('genre', ['N/A']))}
🌎 <b>Country:</b> {', '.join([loc.get('country', 'Unknown') for loc in movie.get('releaseDetailed', {}).get('originLocations', [])])}
🗣 <b>Language:</b> {', '.join([lang.get('language', 'Unknown') for lang in movie.get('spokenLanguages', [])])}

🙎 <b>Cast Info:</b>
👉 <b>Director:</b> {', '.join([director for director in movie.get('directors', ['N/A'])])}
🎎 <b>Stars:</b> {', '.join([actor for actor in movie.get('actors', ['N/A'])])}

🏆 <b>Awards:</b> {movie.get('award', {}).get('wins', 0)} wins & {movie.get('award', {}).get('nominations', 0)} nominations

📜 <b>Summary:</b> {movie.get('plot', 'No plot available.')}

©️ IMDb by <a href="https://t.me/SG_Billboard_Bot">SG</a>
            """

        # Sending the movie details as a photo with the caption and keyboard
        try:
            message = bot.send_photo(GROUP_CHAT_ID, movie.get(
                "poster", ""), caption=movie_text, reply_markup=keyboard, parse_mode='HTML')
            responses = []
            RECIPIENTS = recipients.split(",")
            headers = {
                "Content-type": "application/json",
                "Authorization": f"Bearer {ACCESS_TOKEN}",
            }
            url = f"https://movies.atongjona.com/watch/{quote(movie.get('title'))}"
            movie_text = f"""
📹 *Title:* {movie.get('title', 'N/A')}
🎬 *Watch:* {url}
🕰 *Duration:* {movie.get('runtime', 'N/A')}
📉 *Rating:* {movie.get('rating', {}).get('star', 'N/A')}⭐️ from {movie.get('rating', {}).get('count', 0)} users
🗓️ *Release Date:* {release_date}
📟 *Genre:* {', '.join(movie.get('genre', ['N/A']))}
🌎 *Country:* {', '.join([loc.get('country', 'Unknown') for loc in movie.get('releaseDetailed', {}).get('originLocations', [])])}
🗣 *Language:* {', '.join([lang.get('language', 'Unknown') for lang in movie.get('spokenLanguages', [])])}

🙎 *Cast Info:*
👉 *Director:* {', '.join([director for director in movie.get('directors', ['N/A'])])}
🎎 *Stars:* {', '.join([actor for actor in movie.get('actors', ['N/A'])])}

🏆 *Awards:* {movie.get('award', {}).get('wins', 0)} wins & {movie.get('award', {}).get('nominations', 0)} nominations

📜 *Summary:* {movie.get('plot', 'No plot available.')}

"""

            for RECIPIENT in RECIPIENTS:
                message_body = {
                    "messaging_product": "whatsapp",
                    "to": RECIPIENT,
                    "type": "image",
                    "image": {
                        "link": movie.get("poster"),
                        "caption": movie_text
                        }                    
                }
                logging.info(json.dumps(message_body))
                response = requests.post(
                    f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages", json=message_body, headers=headers)
                logging.info(str(response.json()))
                responses.append(response.status_code)

            return {"success": message.id, "wa_statuused": str(responses)}
        except Exception as e:
            print(f"Error: {e}")
            return {"error": str(e)}
