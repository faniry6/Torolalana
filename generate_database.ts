import fs from 'fs';
import uuid from 'uuid';
import data from './app/assets/orientation-bacc.json';

var assetsPath = './app/assets';
// Find all bacc series
var new_data = [];
for (let content of data) {
  new_data.push({id: uuid()});
  for (let [key, value] of Object.entries(content)) {
    new_data.push(key: value);
  }
}
console.log(new_data);
const result = {updated_at: new Date(), data};
const jsonContent = JSON.stringify(result);
const outFile = '/faculty.json';
fs.writeFile(assetsPath + outFile, jsonContent, 'utf8', function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    console.log(err);
  } else {
    console.log('./assets/faculty.json generated successfully!');
  }
});
