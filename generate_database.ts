import fs from 'fs';

const data = [
  {
    name: 'Mathematique & Informatique',
    bacc: 'C',
    location: 'Antananarivo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    inscription_open: '1 Oct',
    inscription_closed: '2 Oct',
    admission: 'Selection de dossier',
    document:
      "Demande manuscrit signe\nCopie d'acte de naissance\nReleve de note\nQuittance BNI",
    fees: '20 000 Ar',
    bank_account: 'XXXXXX',
    bank_account_owner: 'Mr Mustermann',
  },
  {
    name: 'Physique & Chimie',
    bacc: 'C',
    location: 'Antananarivo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    inscription_open: '1 Oct',
    inscription_closed: '2 Oct',
    admission: 'Selection de dossier',
    document:
      "Demande manuscrit signe\nCopie d'acte de naissance\nReleve de note\nQuittance BNI",
    fees: '20 000 Ar',
    bank_account: 'XXXXXX',
    bank_account_owner: 'Mr Mustermann',
  },
  {
    name: 'Science de la Vie et la Terre',
    bacc: 'C',
    location: 'Antananarivo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    inscription_open: '1 Oct',
    inscription_closed: '2 Oct',
    admission: 'Selection de dossier',
    document:
      "Demande manuscrit signe\nCopie d'acte de naissance\nReleve de note\nQuittance BNI",
    fees: '20 000 Ar',
    bank_account: 'XXXXXX',
    bank_account_owner: 'Mr Mustermann',
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
