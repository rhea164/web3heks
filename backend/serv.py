import os
from werkzeug.utils import secure_filename
from check import describe, verify
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import json

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
uri = os.getenv('MONGO_URI')
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["Cluster0"]

@app.route('/verify_deed', methods=['POST'])
def verify_deed():
    if 'image' not in request.files or 'deed' not in request.form:
        return jsonify({"error": "Missing image or deed"}), 400

    image = request.files['image']
    deed = request.form['deed']

    if image.filename == '':
        return jsonify({"error": "No selected image"}), 400

    if image:
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)

        try:
            description = describe(image_path)
            result = verify(description, deed)
            
            # Clean up the uploaded file
            os.remove(image_path)
            
            return jsonify({"result": result})
        except Exception as e:
            # Clean up the uploaded file in case of an error
            os.remove(image_path)
            return jsonify({"error": str(e)}), 500
    
def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/rewards', methods=['GET'])
def get_all_rewards():
    rewards = db.rewards.find()
    return jsonify(parse_json(rewards)), 200

@app.route('/rewards/popular', methods=['GET'])
def get_popular_rewards():
    popular_rewards = db.rewards.find({"popular": True})
    return jsonify(parse_json(popular_rewards)), 200

@app.route('/rewards/category', methods=['GET'])
def get_rewards_by_category():
    category = request.args.get('category')
    if category:
        rewards = db.rewards.find({"category": category})
    else:
        rewards = db.rewards.find()
    return jsonify(parse_json(rewards)), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)