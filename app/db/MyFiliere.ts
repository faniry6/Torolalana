import realm from '.';
import {List, Results} from 'realm';
import {Filiere} from './Filiere';
import uuid from 'uuid';

export class MyFiliere {
  id!: string;
  filiere!: string;
  filieres!: List<Filiere> | Filiere[];
  updated_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'MyFiliere',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: {type: 'string', optional: false},
      filieres: {type: 'list', objectType: 'Filiere'},
      updated_at: 'date',
    },
  };
  static getAll() {
    return realm.objects<MyFiliere>('MyFiliere').sorted('name');
  }
  static getById(id: string) {
    return realm.objectForPrimaryKey<MyFiliere>('MyFiliere', id);
  }
  static getByName(name: string) {
    return realm
      .objects<MyFiliere>('MyFiliere')
      .filtered('name = $0', name)
      .find(() => true);
  }
  static hasFiliere(playlist: MyFiliere, song: Filiere) {
    if (!playlist || !song) return false;
    return playlist.filieres.some(s => s.id == song.id);
  }
  static addFiliere(playlist: MyFiliere, song: Filiere) {
    realm.write(() => {
      playlist.filieres.push(song);
    });
  }
  static removeFiliere(playlist: MyFiliere, song: Filiere) {
    realm.write(() => {
      playlist.filieres = playlist.filieres.filter(s => s.id != song.id);
    });
  }
  static create(name: string) {
    if (name == null || name == '') {
      throw new Error(`Empty name not allowed`);
    }
    let sameNameMyFiliere = MyFiliere.getByName(name);
    if (sameNameMyFiliere) {
      throw new Error(`MyFiliere with name "${name}" already exists`);
    }
    let playlist: MyFiliere;
    realm.write(() => {
      playlist = realm.create<MyFiliere>('MyFiliere', {
        id: uuid(),
        name,
        updated_at: new Date().toJSON(),
      });
    });
    return playlist!;
  }
  static update(id: string, name: string, filieres: Filiere[]) {
    if (name == null || name == '') {
      throw new Error(`Empty name not allowed`);
    }
    let sameNameMyFiliere = MyFiliere.getByName(name);
    if (sameNameMyFiliere && sameNameMyFiliere.id != id) {
      throw new Error(`MyFiliere with name "${name}" already exists`);
    }
    let playlist = MyFiliere.getById(id);
    if (playlist != null) {
      realm.write(() => {
        playlist!.filiere = name;
        playlist!.filieres = filieres;
        playlist!.updated_at = new Date();
      });
    }
    return playlist;
  }
  static delete(id: string) {
    let playlist = MyFiliere.getById(id);
    if (playlist) {
      realm.write(() => {
        realm.delete(playlist);
      });
    }
  }

  static getFilieres(playlist: MyFiliere, sortBy: SortBy, reverse: boolean) {
    let filieres: Results<Filiere> | List<Filiere> | Filiere[] =
      playlist.filieres;
    if (filieres instanceof Array) {
      let asc = reverse ? -1 : 1;
      if (sortBy === 'TITLE') {
        filieres = filieres.sort((a, b) => {
          if (a.filiere < b.filiere) {
            return asc * -1;
          }
          if (a.filiere > b.filiere) {
            return asc * 1;
          }
          return 0;
        });
      }
    }
    return filieres;
  }
}

export type SortBy = 'TITLE';
