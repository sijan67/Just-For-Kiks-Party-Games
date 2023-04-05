from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
from pprint import pprint
import json
import os

app = Flask(__name__)
CORS(app)

print("^^^^^^^^")


@app.route('/', methods=['GET'])
def process():
    return json.dumps({ "text": "Audio successfully processed!" }), 200


# @app.route("/audio", methods=["POST"])
# def audio():
#     data = request.get_data()
#     # print(data)
#     audio_file = request.files.get("file")
#     print(audio_file)
#     if audio_file:
#         audio_file.save(os.path.join("uploads", audio_file.filename))
#         return json.dumps({"text": "Received audio file."})
#     else:
#         return json.dumps({"text": "No audio file received."}), 400

# if __name__ == "__main__":
#     if not os.path.exists("uploads"):
#         os.makedirs("uploads")
#     app.run(host="0.0.0.0", port=4000)

@app.route('/audio', methods=['POST'])
def process_audio():
    data = request.get_data()
    print("data: ", data)
    data_length = request.content_length

    if (data_length > 1024 * 1024 * 10):
        return 'File too large!', 400

    return json.dumps({ "text": "Audio successfully processed!" }), 200
#     return  json.dumps({"text": "Received audio file."})


if __name__ == "__main__":
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(host="0.0.0.0", port=4000)

# if __name__ == "__main__":
#     # app = create_app()
#     app.run(debug=True)