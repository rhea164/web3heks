from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import json
import os

app = Flask(__name__)

uri = "change"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Get the database
db = client["Cluster0"]

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
def get_rewards_by_category(category):
    rewards = db.rewards.find({"category": category})
    return jsonify(parse_json(rewards)), 200

if __name__ == '__main__':
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    
    app.run(debug=True)