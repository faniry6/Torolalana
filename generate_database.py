import json
import uuid
from datetime import datetime

#Open array file
file = './app/assets/orientation-bacc.json'
with open(file, encoding='utf8') as json_file:
  data = json.load(json_file)
  for p in data:
    print(p)
    p['id'] = str(uuid.uuid1())

with open('./app/assets/database.json', 'w', encoding='utf8') as outfile:
  json.dump({'updated_at': str(datetime.now().isoformat()), 'data': data}, outfile, ensure_ascii=False)
