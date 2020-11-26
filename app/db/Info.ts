import realm from '.';
import data from '../assets/database.json';

const DEFAULTS: Info = {
  database_update: new Date(data.updated_at),
  first_use: true,
};
export class Info {
  database_update!: Date;
  first_use!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Info',
    properties: {
      database_update: {
        type: 'date',
        default: new Date(data.updated_at),
      },
      first_use: {
        type: 'bool',
        default: true,
      },
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

  static setFirstUse(flag: boolean) {
    let current = this.get();
    realm.write(() => {
      current.first_use = flag;
    });
  }
  static update(date: Date) {
    let current = this.get();
    realm.write(() => {
      current.database_update = date;
    });
  }
}
