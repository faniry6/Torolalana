import React, {useState, FC, useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {FiliereDoc} from '../services/BaseService';
import {services, getService} from '../services';
import {Filiere} from '../db/Filiere';
import {Info} from '../db/Info';
import realm from '../db';
import LoadingIndicator from '../components/LoadingIndicator';
import {TouchableOpacity} from 'react-native';

export const DatabaseUpdate: FC<{}> = props => {
  const [docs, setDocs] = useState<FiliereDoc[] | null>(null);
  const [serviceName] = useState(services[0].name);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  function getCurrentDatabaseVersion() {
    let date = Info.get().database_update;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let mn = date.getMinutes();
    let format = day + '/' + month + '/' + year + ', ' + hour + ':' + mn;
    return 'Dernière mise à jour : ' + format;
  }

  useEffect(() => {
    setMessage(getCurrentDatabaseVersion());
  }, []);

  async function findAndUpdateDatabase() {
    const fetchData = async () => {
      const docs = await getService(serviceName)!.getAll();
      setDocs(docs);
      try {
        if (docs != null && !isLoading) {
          var index = 0;
          var new_date = Info.get().database_update;
          for (let server_filiere of docs) {
            let local_filiere = Filiere.getById(server_filiere.id);
            let server_date = new Date(server_filiere.updated_at);
            index = index + 1;
            if (local_filiere == null) {
              // create a new one
              Filiere.create(server_filiere);
              if (new_date < server_date) {
                new_date = server_date;
              }
            } else {
              // check timestamp and compare
              let local_date = new Date(local_filiere.updated_at);
              console.log(server_filiere.bacc);

              if (local_date < server_date) {
                Alert.alert(
                  'Updating',
                  server_filiere.filiere + ' ' + server_filiere.bacc.length,
                );
                realm.write(() => {
                  local_filiere!.filiere = server_filiere.filiere;
                  local_filiere!.description = server_filiere.description;
                  local_filiere!.bacc = server_filiere.bacc;
                  local_filiere!.location = server_filiere.location;
                  local_filiere!.updated_at = server_filiere.updated_at;
                  local_filiere!.inscription_open =
                    server_filiere.inscription_open;
                  local_filiere!.inscription_closed =
                    server_filiere.inscription_closed;
                  local_filiere!.fees = server_filiere.fees;
                  local_filiere!.bank_account = server_filiere.bank_account;
                  local_filiere!.bank_account_owner =
                    server_filiere.bank_account_owner;
                  local_filiere!.admission = server_filiere.admission;
                  local_filiere!.document = server_filiere.document;
                  local_filiere!.domaine = server_filiere.domaine;
                });
              }
              if (new_date < server_date) {
                new_date = server_date;
              }
            }
          }
          if (new_date > Info.get().database_update) {
            Alert.alert('Info', 'Mise à jour réussie');
          } else {
            Alert.alert('Info', 'Votre base de données est déjà à jour');
          }
          setIsLoading(false);
          Info.update(new Date(new_date));
          setMessage(getCurrentDatabaseVersion());
        }
      } catch (e) {
        if (e instanceof Error) {
          setIsLoading(false);
          setError(e.message);
        } else {
          throw e;
        }
      }
    };
    setIsLoading(true);
    setError(null);
    await fetchData();
    setIsLoading(false);
  }
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity
        onPress={findAndUpdateDatabase}
        style={[styles.appButtonContainer]}>
        <Text style={styles.appButtonText}>{'Mettre a jour'}</Text>
      </TouchableOpacity>
      <LoadingIndicator error={error} loading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    marginVertical: 8,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  appButtonContainer: {
    backgroundColor: 'seagreen',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: '20%',
    marginRight: '20%',
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
