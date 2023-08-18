from pymongo import MongoClient, ASCENDING, DESCENDING
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.jungle


@app.route("/")
def home():
    return render_template("index.html")

# GET API


@app.route("/api/movies/sort_like", methods=["GET"])
def moviesSortedByLike():
    movies = list(db.movies.find({"is_deleted": False}, {
        "_id": False}).sort("like", DESCENDING))
    return jsonify({"ok": True, "movies": movies})


@app.route("/api/movies/sort_view", methods=["GET"])
def moviesSortedByView():
    movies = list(db.movies.find({"is_deleted": False}, {
        "_id": False}).sort("view_num", DESCENDING))
    return jsonify({"ok": True, "movies": movies})


@app.route("/api/movies/sort_open", methods=["GET"])
def moviesSortedByOpen():
    movies = list(db.movies.find({"is_deleted": False}, {
        "_id": False}).sort([("open_year", ASCENDING), ("open_month", ASCENDING), ("open_day", ASCENDING)]))
    return jsonify({"ok": True, "movies": movies})


@app.route("/api/movies/sort_delete", methods=["GET"])
def moviesDeleted():
    movies = list(db.movies.find({"is_deleted": True}, {
        "_id": False}).sort("like", DESCENDING))
    return jsonify({"ok": True, "movies": movies})


@app.route("/api/like/movie", methods=["POST"])
def likeMovie():
    title = request.form["title"]
    db.movies.update_one({"title": title}, {"$inc": {"like": 1}})
    return jsonify({"ok": True})


@app.route("/api/delete/movie", methods=["POST"])
def deleteMovie():
    title = request.form["title"]
    bol = db.movies.find_one({"title": title})["is_deleted"]
    db.movies.update_one({"title": title}, {"$set": {"is_deleted": not bol}})
    return jsonify({"ok": True})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
