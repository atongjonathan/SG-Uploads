import json
import os
from opensubtitlescom import OpenSubtitles
from django.conf import settings
from telebot import TeleBot

bot = TeleBot(settings.BOT_TOKEN)


def search(imdb_id):
    try:
        subtitles = OpenSubtitles("sguploads v1.0.0", settings.API_KEY)
        subtitles.login(settings.API_USERNAME, settings.PASSWORD)

        # Search for subtitles
        response = subtitles.search(imdb_id=imdb_id, languages="en")
        response_dict = response.to_dict()

        # Debug print to inspect the response structure
        print(response_dict)

        # Ensure 'data' is a list
        response_data = response_dict.get("data", [])
        if not isinstance(response_data, list):
            return {"error": "'data' field is not a list as expected"}

        if not response_data:
            return {"error": "No subtitles found"}

        # Access Subtitle object attributes correctly
        first_subtitle = response_data[0]

        # Download the subtitle in WebVTT format
        srt_content = subtitles.download(first_subtitle, sub_format="webvtt")

        filename = f"{first_subtitle.release}.webvtt"

        with open(filename, 'wb') as file:
            file.write(srt_content)

        return filename

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}


def send_to_tg(telegram_id, file_path):

    try:
        # Send the file to Telegram
        with open(file_path, 'rb') as file:
            message = bot.send_document(telegram_id, file)
        os.remove(file_path)
        return message.id
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}
