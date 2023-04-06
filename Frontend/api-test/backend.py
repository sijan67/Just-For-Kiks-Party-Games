from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
from pprint import pprint
import json
import os
import binascii
import wave
import numpy as np

app = Flask(__name__)
CORS(app)

print("^^^^^^^^")


@app.route('/', methods=['GET'])
def process():
    return json.dumps({ "text": "Audio successfully processed!" }), 200

@app.route('/audio', methods=['POST'])
def process_audio():
    data = request.get_data()
    # print("data: ", data)
    data_length = request.content_length

    if (data_length > 1024 * 1024 * 10):
        return 'File too large!', 400
    
    with wave.open('audio.wav', 'wb') as f:
        f.setnchannels(2)  # assuming mono audio
        f.setsampwidth(2)  # assuming 16-bit audio
        f.setframerate(56050)  # assuming 16 kHz sampling rate
        f.writeframes(data)  # writing audio data to file


    return json.dumps({ "text": "Audio successfully processed!" }), 200


if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(host="0.0.0.0", port=4000)

