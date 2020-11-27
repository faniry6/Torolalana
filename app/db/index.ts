import Realm from 'realm';
import {Filiere} from './Filiere';
import {Bacc} from './Bacc';
import {Info} from './Info';
import {MyFiliere} from './MyFiliere';

var realm = new Realm({
  schema: [Filiere.schema, Bacc.schema, Info.schema, MyFiliere.schema],
  schemaVersion: 8,
  migration: () => {},
});
export default realm;

export {Filiere};
export {Bacc};
export {Info};
export {MyFiliere};
