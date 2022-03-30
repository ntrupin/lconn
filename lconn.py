from flask import Flask, render_template, url_for
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
     return render_template("index.jinja")

@app.route("/search/<string:mode>/<string:query>", methods=["GET"])
def search(mode, query):
    if mode not in ["users", "alumni"]: return
    if len(query) > 0 and query[0] != "#":
        query = f"#{query}"
    with open(f"./static/dummy/{mode}.json") as uf,\
        open("./static/dummy/tags.json") as tf:
        users = json.load(uf)
        tags = json.load(tf)
        print(query in tags["groups"])
        assoc = tags["groups"][query] \
            if query in tags["groups"] \
            else [] \
                if query not in tags["tags"] \
                else [query]
        print(assoc)  
        return json.dumps([
            u for u in users 
            if len(set(assoc + u["tags"])) < len(assoc + u["tags"])
        ]) 

@app.route("/posts", methods=["GET"])
def posts():
    with open("./static/dummy/posts.json") as pf:
        posts = json.load(pf)
        return json.dumps(posts)

@app.route("/alumni", methods=["GET"])
def alumni():
    with open("./static/dummy/alumni.json") as af:
        alumni = json.load(af)
        return json.dumps(alumni)