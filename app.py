from flask import Flask, render_template, redirect, jsonify, current_app, request
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
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

@app.route('/api/gender', methods=['GET'])
def gender():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Gender": 1,
        "Year": 1}
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "gender": "$Gender"},
        "count" : {"$sum" : 1}}
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING}
   }]
    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)

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


@app.route('/api/country', methods=['GET'])
def country():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Country": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "country": "$Country"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING
      }
   },
]


    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)


@app.route('/api/pace', methods=['GET'])
def pace():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Pace": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "pace": "$Pace"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING
      }
   },
]


    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)

@app.route('/api/half', methods=['GET'])
def half():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Half Marathon Split": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "half marathon split": "$Half Marathon Split"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING
      }
   },
]


    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)


@app.route('/api/final', methods=['GET'])
def final():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Offical Time": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "offical time": "$Offical Time"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "Year": pymongo.ASCENDING
      }
   },
]



@app.route('/api/latlong', methods=['GET'])
def latlong():
    pipeline = [
    {
    "$project": {
        "_id": 0,
        "Latitude": 1,
        "Longitude": 1,
        "State": 1,
        "Year": 1
    }
    },
    {
    "$group": {
        "_id" : {"year": "$Year", "latitude": "$Latitude", "longitude": "$Longitude", "state": "$State"},
        "count" : {"$sum" : 1}
    }
    },
   {
      "$sort": {
         "State": pymongo.ASCENDING
      }
   },
]


    results = marathon_collection.aggregate(pipeline)
    results = [rex for rex in results]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
