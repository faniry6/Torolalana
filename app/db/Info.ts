import realm from '.';
import data from '../assets/database.json';

const DEFAULTS: Info = {
  database_update: new Date(data.updated_at),
};
export class Info {
  database_update!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Info',
    properties: {
      database_update: {type: 'date', default: DEFAULTS.database_update},
    },
  };

  static get(): Info {
    let Info = realm.objects<Info>('Info').find(() => true);
    if (Info == null) {
      realm.write(() => {
        realm.create<Info>('Info', {});
      });
      return DEFAULTS;
    } else {
      return Info!;
    }
  }

  static update(date: Date) {
    let current = this.get();
    realm.write(() => {
      current.database_update = date;
    });
  }
}
