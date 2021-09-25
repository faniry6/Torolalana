import React, {
  useState,
  useEffect,
  useLayoutEffect,
  FunctionComponent,
} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Filiere} from '../db';
import {MyFiliere} from '../db';
import {RootStackParamList} from '../AppNavigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TouchableIcon from '../components/TouchableIcon';
import {Icon} from 'react-native-vector-icons/Icon';

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
  const [bacc, setBacc] = useState<string[]>([]);
  const [fees, setFees] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bank_account, setBank] = useState<string>('');
  const [bank_account_owner, setBankOwner] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [inscription_open, setInscriptionOpen] = useState<string>('');
  const [inscription_close, setInscriptionClose] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('');
  const [admission, setAdmission] = useState<string>('');
  var state = {icon: 'bookmark-outline', liked: false};

  useEffect(() => {
    let filiere = Filiere.getById(filiereId)!;
    setName(filiere.filiere);
    setDescription(filiere.description);
    setBacc(filiere.bacc);
    setLocation(filiere.location);
    setInscriptionOpen(filiere.inscription_open);
    setInscriptionClose(filiere.inscription_closed);
    setDocument(filiere.document);
    setFees(filiere.fees);
    setBank(filiere.bank_account);
    setBankOwner(filiere.bank_account_owner);
    setFaculty(filiere.domaine);
    setAdmission(filiere.admission);
  }, []);

  function renderBacc(bacc: string[]) {
    var s = '';
    for (let e in bacc) {
      s += bacc[e] + ', ';
    }
    console.log(s);
    return s.slice(0, -2);
  }

  function renderDocument(document: string) {
    return document.split('\n');
  }
  function renderRow(data: string) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.contentText}>{'\u2022'}</Text>
        <Text style={[styles.contentText, {flex: 1, paddingLeft: 5}]}>
          {data}
        </Text>
      </View>
    );
  }
  function addEntry(title: string, content: string) {
    return (
      <View style={styles.listEntry}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    );
  }

  function onHeartPress() {
    // if(MyFiliere.hasFiliere(myfiliere, Filiere.getById(filiereId)!)) {
    //   if (state.liked) {
    //       MyFiliere.removeFiliere(myfiliere, Filiere.getById(filiereId)!)
    //   }

    // }
    if (state.liked) {
      MyFiliere.removeFiliere(Filiere.getById(filiereId)!);
    } else {
      MyFiliere.addFiliere(Filiere.getById(filiereId)!);
    }

    if (state.liked) {
      state = {icon: 'bookmark-outline', liked: false};
    } else {
      state = {icon: 'bookmark', liked: true};
    }
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableIcon
            onPress={() => onHeartPress()}
            style={styles.bookmark}
            name={state.icon}
            size={30}
          />
        </View>
      ),
    });
  }

  function updateNavigation() {
    Alert.alert('state', '' + state.liked);
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableIcon style={styles.bookmark} name={state.icon} size={30} />
          {/* <Text>Here</Text> */}
        </View>
      ),
    });
  }
  useLayoutEffect(() => {
    if (MyFiliere.hasFiliere(Filiere.getById(filiereId)!)) {
      state = {icon: 'bookmark', liked: true};
    }
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableIcon
            onPress={() => onHeartPress()}
            style={styles.bookmark}
            name={state.icon}
            size={30}
          />
        </View>
      ),
    });
  }, [navigation]);
  // useEffect(() => {
  //   if (MyFiliere.hasFiliere(Filiere.getById(filiereId)!)) {
  //     setState({icon: 'bookmark', liked: true});
  //   }
  // }, []);

  return (
    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {addEntry('Filiere', name)}
        {addEntry('Bacc', renderBacc(bacc))}
        {addEntry('Description', description)}
        {addEntry('Domaine', faculty)}
        {addEntry('Location', location)}
        {addEntry(
          "Ouverture d'inscription",
          inscription_open + ' - ' + inscription_close,
        )}
        {addEntry('Admission', admission)}
        <View style={styles.listEntry}>
          <Text style={styles.titleText}>{'Dossiers'}</Text>
          <View style={styles.container}>
            <FlatList
              data={renderDocument(document)}
              renderItem={({item}) => renderRow(item)}
              scrollEnabled={false}
            />
          </View>
        </View>
        {addEntry("Frais d'inscription", fees)}
        {addEntry(
          'Compte de transfert',
          'Nom : ' + bank_account_owner + '\n' + 'Banque : ' + bank_account,
        )}
        {addEntry('', '')}
      </ScrollView>
      {/* <TouchableIcon
        onPress={onHeartPress}
        style={styles.bookmark}
        name={state.icon}
        size={30}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  contentText: {
    color: 'white',
  },
  listEntry: {
    backgroundColor: 'green',
    margin: 2,
    padding: 10,
  },
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    //marginTop: '5%',
  },
  content: {
    color: 'black',
    fontSize: 25,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bookmark: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
  },
});

export default FiliereView;
