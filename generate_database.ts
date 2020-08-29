import fs from 'fs';

const data = [
  {
    name: 'Mathematique',
    bacc: 'C',
    location: 'Antananarivo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    inscription_open: '1 Oct',
    inscription_closed: '2 Oct',
  },
];

var assetsPath = './app/assets';
const result = {updated_at: new Date(), data};
const jsonContent = JSON.stringify(result);
fs.writeFile(assetsPath + '/database.json', jsonContent, 'utf8', function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    console.log(err);
  } else {
    console.log('./assets/database.json generated successfully!');
  }
});
