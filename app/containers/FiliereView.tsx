import React, {
  useState,
  useEffect,
  FunctionComponent,
  useRef,
  useContext,
  useLayoutEffect,
  FC,
} from 'react';
import {Text, View, StyleSheet, Switch, TouchableHighlight} from 'react-native';
import {Filiere} from '../db';
import {RootStackParamList} from '../AppNavigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';

type FiliereViewScreenRouteProp = RouteProp<RootStackParamList, 'FiliereView'>;
type FiliereViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FiliereView'
>;
type Props = {
  route: FiliereViewScreenRouteProp;
  navigation: FiliereViewScreenNavigationProp;
};

const FiliereView: FunctionComponent<Props> = props => {
  const {navigation} = props;
  const filiereId = props.route.params.id;
  const [description, setDescription] = useState<string>('');
  const [name, setTitle] = useState<string>('');
  const [bacc, setBacc] = useState<string[]>([]);
  const [fees, setFees] = useState<string>('');
  const [bank_account, setBank] = useState<string>('');
  const [bank_account_owner, setBankOwner] = useState<string>('');
  const [admission, setAdmission] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [inscription_open, setInscriptionOpen] = useState<string>('');
  const [inscription_close, setInscriptionClose] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('');

  useEffect(() => {
    let filiere = Filiere.getById(filiereId)!;
    setTitle(filiere.filiere);
    setDescription(filiere.description);
    setBacc(filiere.bacc);
    setLocation(filiere.location);
    setInscriptionOpen(filiere.inscription_open);
    setInscriptionClose(filiere.inscription_closed);
    setDocument(filiere.document);
    setFees(filiere.fees);
    setBank(filiere.bank_account);
    setBankOwner(filiere.bank_account_owner);
    setAdmission(filiere.admission);
    setFaculty(filiere.domaine);
  }, []);

  function renderBacc(bacc: string[]) {
    var s = '';
    for (let e in bacc) {
      s += bacc[e] + ', ';
    }
    return s.slice(0, -2);
    //return bacc[0];
  }
  return (
    <View style={styles.content}>
      <ScrollView>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {'Bacc'}
            {'\n'}
          </Text>
          <Text>
            {renderBacc(bacc)}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Description'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>
            {description}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Domaine'}
            {'\n'}
          </Text>
          <Text>
            {faculty}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Location'}
            {'\n'}
          </Text>
          <Text>
            {location}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Dossiers'}
            {'\n'}
          </Text>
          <Text>
            {document}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Admission'}
            {'\n'}
          </Text>
          <Text>
            {admission}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {"Ouverture d'inscription"}
            {'\n'}
          </Text>
          <Text>
            {inscription_open}
            {' - '}
            {inscription_close}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {"Frais d'inscription"}
            {'\n'}
          </Text>
          <Text>
            {fees}
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.titleText}>
            {'Compte de transfert'}
            {'\n'}
          </Text>
          <Text>
            {bank_account}
            {' adressée à '}
            {bank_account_owner}
            {'\n'}
            {'\n'}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    fontSize: 25,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default FiliereView;
