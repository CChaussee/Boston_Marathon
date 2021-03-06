from flask import Flask, render_template, redirect, jsonify, current_app, request
import pymongo
from pymongo import MongoClient
from collections import defaultdict
# Create an instance of Flask
app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = MongoClient(conn)
db = client.marathon_db
marathon_collection = db.marathon
marathondata = [runner for runner in marathon_collection.find({}, {'_id': False})]


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/api', methods=['GET'])
def api():
    boston = list(marathondata)
    return jsonify(boston)

@app.route('/api/scatter', methods=['GET'])
def scatter():
    series = request.args.get('series')
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Age": 1,
        "Gender": 1,
        "Country": 1,
        "Year": 1,
        "Offical Time": 1}
    }]
    results = marathon_collection.aggregate(pipeline)
    chartdata = defaultdict(list)
    for result in results:
        hms = result["Offical Time"].split(":")
        minutes = float(hms[0]) * 60
        try:
            minutes += float(hms[1])
        except:
            pass
        try:
            minutes += float(hms[2]) / 60
        except:
            pass
        chartdata[result[series]].append((result['Age'], minutes))
    return jsonify(chartdata)



if __name__ == "__main__":
    app.run(debug=True)
