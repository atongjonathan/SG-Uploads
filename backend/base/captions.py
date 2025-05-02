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
TELEGRAM_BOT_TOKEN = '6726476385:AAFScoISqcE_XFk_E8ucvMCqeKRqkQPlhH0'
bot = TeleBot(TELEGRAM_BOT_TOKEN)
caption_bot = TeleBot('6453092959:AAH65NtLGOXgR3F6Ak30FXCN1tguOnxQpZA')

PHONE_NUMBER_ID = "379940855196731"
ACCESS_TOKEN = "EAAOaHvjwayUBO1ygAsZAwOzWEL6i7NsJeXxInyFZC0f145YZAgir8eqALUSU5t7EMUhVkN3hn216UlnV9WLUQj6hOaZBoLe2d5KZAWvGFoK49RYeYYth8Xus0ZCLjL0A1ZBmGq4kHwv3ZALl4P0o8V5PS2CdJYFLDetaOCBjuqeLgmc9cpbzyo0966F7eO5la4gFTxhoNcZArhFl3vFne"
recipients = "254708683896,254794208654"


def download_video(url, filename):
    filename = filename.replace("m4v", "mp4")
    """Download video from the URL and save it to the file"""
    try:
        response = requests.get(url, stream=True)
        with open(filename, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Video saved as {filename}")
        return filename
    except Exception as e:
        print(f"Error downloading video: {e}")
        return {"error": str(e)}


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
            logging.exception(f"Error: {e}")
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
            logging.exception(f"Error: {e}")
            return {"error": str(e)}

    def send_to_tg(self, telegram_id, file_path):

        try:
            # Send the file to Telegram
            with open(file_path, 'rb') as file:
                message = caption_bot.send_document(telegram_id, file)
            os.remove(file_path)
            return message.id
        except Exception as e:
            logging.exception(f"Error: {e}")
            return {"error": str(e)}

    def update_group(self, movie):
        keyboard = InlineKeyboardMarkup()
        # Use `movie.get('stream', '#')` to prevent errors
        button = InlineKeyboardButton(
            "🎬 Watch now",  url=f"https://streamgrid.stream/watch/{quote(movie.get('title'))}")
        keyboard.add(button)

        try:
            release_date = movie.get('releaseDetailed', {}).get('date', 'N/A')
            release_date = datetime.strptime(
                release_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d-%m-%Y") if release_date != 'N/A' else 'N/A'
        except Exception as e:
            release_date = 'N/A'
            logging.exception(f"Error parsing release date: {e}")

        # Format the movie details text
        watch_url = f"https://streamgrid.stream/watch/{quote(movie.get('title'))}"
        movie_text = f"""
📹<b>Title:</b> <a href="{movie.get('link', '#')}"> {movie.get('title', 'N/A')}</a>
🎬 <b>Watch</b> {watch_url}
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
        trailer_url = getTrailer(movie.get("title"))
        # Sending the movie details as a photo with the caption and keyboard
        try:
            message = bot.send_photo(GROUP_CHAT_ID, movie.get(
                "poster"), caption=movie_text, reply_markup=keyboard, parse_mode='HTML')
        except Exception as e:
            logging.info("%s has high res image sending as document...", movie["title"])
            try:
                message = bot.send_document(GROUP_CHAT_ID, movie.get(
                    "poster"), caption=movie_text, reply_markup=keyboard, parse_mode='HTML')
            except Exception as e:
                movie_text += f'\n\n<a href="{movie.get("poster", "N/A")}">{movie.get("title", "N/A")} image</a>'
                message = bot.send_message(GROUP_CHAT_ID, text=movie_text, reply_markup=keyboard, parse_mode='HTML')

        responses = []
        RECIPIENTS = recipients.split(",")
        headers = {
            "Content-type": "application/json",
            "Authorization": f"Bearer {ACCESS_TOKEN}",
        }
        url = f"https://streamgrid.stream/watch/{quote(movie.get('title'))}"
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
            response = requests.post(
                f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages", json=message_body, headers=headers)
            if response.status_code != 200:
                logging.error(
                    f"Sending whatsapp image status is {response.status_code}, \mResponse:{json.dumps(response.json(), indent=4)}")
            else:
                logging.info(
                    f"Whatsapp image for {movie.get('title')} sent successfuly to {RECIPIENT}")
            send_trailer(RECIPIENT, movie.get("title"), trailer_url)
            responses.append(response.status_code)

        if trailer_url:
            video_filename = trailer_url.split("/")[-1]
            filename = download_video(trailer_url, video_filename)
            response.raise_for_status()
            with open(filename, 'rb') as file:
                bot.send_video(
                    GROUP_CHAT_ID, file, reply_to_message_id=message.id, supports_streaming=True)
            os.remove(filename)
        return {"success": message.id, "wa_statuused": str(responses)}


def getTrailer(text):
    reqUrl = f"https://itunes.apple.com/search?term={text}&entity=movie&media=movie"
    response = requests.get(reqUrl)
    data = response.json()
    results = data.get("results")
    if len(results) > 0:
        result = results[0]
        url = result.get("previewUrl")
        logging.info(f"Trailer for {text} found")
        return url


def send_trailer(recipient, text, url):
    if url:
        message_body = {
            "messaging_product": "whatsapp",
            "to": recipient,
            "type": "document",
            "document": {
                "link": url,
                "filename": f"{text}.mp4"
            }
        }
        headers = {
            "Content-type": "application/json",
            "Authorization": f"Bearer {ACCESS_TOKEN}",
        }
        response = requests.post(
            f"https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages", json=message_body, headers=headers)
        if response.status_code != 200:
            logging.error(
                f"Whatsapp trailer status is {response.status_code}, \mResponse:{json.dumps(response.json(), indent=4)}")
        else:
            logging.info(
                f"Whatsapp trailer for {text} sent successfuly to {recipient}")
