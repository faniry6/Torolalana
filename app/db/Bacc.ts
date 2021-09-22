import uuid from 'uuid';
import realm from '.';
import allBacc from '../assets/bacc.json';

const data = [
  {id: '1', serie: 'A1'},
  {id: '2', serie: 'A2'},
  {id: '3', serie: 'C'},
  {id: '4', serie: 'D'},
  {id: '5', serie: 'TI'},
  {id: '6', serie: 'TGC'},
  {id: '7', serie: 'TA'},
  {id: '8', serie: 'TT'},
  {id: '9', serie: 'L'},
  {id: '10', serie: 'S'},
];

export class Bacc {
  id!: string;
  serie!: string;
  updated_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Bacc',
    primaryKey: 'id',
    properties: {
      id: 'string',
      serie: 'string',
    },
  };
  static search(query: string) {
    return realm.objects<Bacc>('Bacc').filtered('serie CONTAINS[c] $0', query);
  }
  static getAll() {
    return realm.objects<Bacc>('Bacc').sorted('serie');
  }
  static shouldUpdateDb() {
    let s = this.getAll().find(() => true);
    let newSongsDate = new Date(allBacc.updated_at);
    if (s == null) return true;
    else return newSongsDate > s.updated_at;
  }
  static populateDb() {
    //if (this.shouldUpdateDb()) {
    for (var i = 0; i < data.length; i++) {
      let id = uuid();
      let serie = data[i].serie;
      let updated_at = new Date();
      realm.write(() => {
        realm.create<Bacc>('Bacc', {
          updated_at,
          id,
          serie,
        });
      });
    }
    //}
  }
}
