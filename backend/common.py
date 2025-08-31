import json
from pathlib import Path

def load_json(path: Path):
    with open(path, 'r') as file:
        return json.load(file)