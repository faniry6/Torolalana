import Realm from 'realm';
import {Artist} from './Artist';
import {Song} from './Song';
import {Playlist} from './Playlist';
import {GlobalSettings} from './GlobalSettings';
import {Filiere} from './Filiere';
import {Bacc} from './Bacc';

var realm = new Realm({
  schema: [
    Song.schema,
    Artist.schema,
    Playlist.schema,
    GlobalSettings.schema,
    Filiere.schema,
    Bacc.schema,
  ],
  schemaVersion: 8,
  migration: () => {},
});
export default realm;

export {Song};
export {Artist};
export {Filiere};
export {Bacc};
