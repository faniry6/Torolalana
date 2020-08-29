import uuid from 'uuid';
import realm from '.';
import allFiliere from '../assets/database.json';

export class Filiere {
  id!: string;
  name!: string;
  description!: string;
  bacc!: string;
  location!: string;
  updated_at!: Date;
  inscription_open!: Date;
  inscription_closed!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Filiere',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      description: 'string',
      bacc: 'string',
      location: 'string',
      inscription_open: 'string',
      inscription_closed: 'string',
    },
  };
  static search(query: string) {
    return realm
      .objects<Filiere>('Filiere')
      .filtered('name CONTAINS[c] $0', query);
  }
  static getById(id: string) {
    return realm.objectForPrimaryKey<Filiere>('Filiere', id);
  }
  static getByBacc(bacc: string) {
    return realm
      .objects<Filiere>('Filiere')
      .filtered('bacc = $0', bacc)
      .sorted('name');
  }

  static getByLocation(location: string) {
    return realm
      .objects<Filiere>('Filiere')
      .filtered('location = $0', location)
      .sorted('name');
  }
  static getAll() {
    return realm.objects<Filiere>('Filiere').sorted('name');
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
        let id = uuid();
        let name = data[i].name;
        let description = data[i].description;
        let location = data[i].location;
        let inscription_open = data[i].inscription_open;
        let inscription_closed = data[i].inscription_closed;
        let bacc = data[i].bacc;
        realm.write(() => {
          realm.create<Filiere>('Filiere', {
            id,
            name,
            description,
            bacc,
            location,
            inscription_open,
            inscription_closed,
          });
        });
      }
    }
  }
}
