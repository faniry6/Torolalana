import {Orient} from 'react-native-svg';
import uuid from 'uuid';
import realm from '.';
import allFiliere from '../assets/database.json';
import {FiliereDoc} from '../services/BaseService';

export class Filiere {
  id!: string;
  filiere!: string;
  description!: string;
  bacc!: string[];
  location!: string;
  updated_at!: Date;
  inscription_open!: string;
  inscription_closed!: string;
  fees!: string;
  bank_account!: string;
  bank_account_owner!: string;
  admission!: string;
  document!: string;
  domaine!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Filiere',
    primaryKey: 'id',
    properties: {
      id: 'string',
      filiere: 'string',
      description: 'string',
      bacc: 'string?[]',
      location: 'string',
      inscription_open: 'string',
      inscription_closed: 'string',
      admission: 'string',
      document: 'string',
      fees: 'string',
      bank_account: 'string',
      bank_account_owner: 'string',
      domaine: 'string',
      updated_at: 'date',
    },
  };
  static search(query: string) {
    return realm
      .objects<Filiere>('Filiere')
      .filtered('filiere CONTAINS[c] $0', query);
  }
  static getById(id: string) {
    return realm.objectForPrimaryKey<Filiere>('Filiere', id);
  }

  static updateById(id: string) {}

  static getByBacc(query: string) {
    var object = realm.objects<Filiere>('Filiere');
    return realm
      .objects<Filiere>('Filiere')
      .filtered('bacc CONTAINS $0', query)
      .sorted('filiere');
  }

  static getByLocation(location: string) {
    return realm
      .objects<Filiere>('Filiere')
      .filtered('location = $0', location)
      .sorted('filiere');
  }
  static getAll() {
    return realm.objects<Filiere>('Filiere').sorted('filiere');
  }
  static create(filiere: FiliereDoc) {
    realm.write(() => {
      filiere = realm.create<Filiere>('Filiere', filiere);
    });
    return filiere!;
  }
  static shouldUpdateDb() {
    let s = this.getAll().find(() => true);
    let newSongsDate = new Date(allFiliere.updated_at);
    if (s == null) return true;
    else return newSongsDate > s.updated_at;
  }
  static populateDb() {
    if (this.shouldUpdateDb()) {
      let data = allFiliere.data;
      for (var i = 0; i < data.length; i++) {
        let id = data[i].id;
        let filiere = data[i].filiere;
        let description = data[i].description;
        let location = data[i].location;
        let inscription_open = data[i].inscription_open;
        let inscription_closed = data[i].inscription_closed;
        let bacc = data[i].bacc;
        let admission = data[i].admission;
        let document = data[i].document;
        let fees = data[i].fees;
        let bank_account = data[i].bank_account;
        let bank_account_owner = data[i].bank_account_owner;
        let updated_at = new Date();
        let domaine = data[i].domaine;
        if (this.getById(id) == null) {
          realm.write(() => {
            realm.create<Filiere>('Filiere', {
              updated_at,
              id,
              filiere,
              description,
              bacc,
              location,
              inscription_open,
              inscription_closed,
              admission,
              document,
              fees,
              bank_account,
              bank_account_owner,
              domaine,
            });
          });
        }
      }
    }
  }
}
