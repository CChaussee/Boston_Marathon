from flask import Flask, render_template, redirect, jsonify, current_app
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
# Create an instance of Flask
app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = MongoClient(conn)
db = client.marathon_db
marathon_collection = db.marathon
marathondata = [runner for runner in marathon_collection.find()]

   
@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/api', methods=['GET'])
def home():
    boston = list(marathondata)
    return current_app.response_class(dumps(boston), mimetype="application/json")    

if __name__ == "__main__":
    app.run(debug=True)
