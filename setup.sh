#!/bin/zsh

if [ ! -d "./venv" ]; then
    python3 -m venv venv
    . ./venv/bin/activate
    python3 -m pip install -r requirements.txt
else
    . ./venv/bin/activate
fi

export FLASK_APP=lconn.py