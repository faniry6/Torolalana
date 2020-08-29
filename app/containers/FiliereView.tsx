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
  useEffect(() => {
    let filiere = Filiere.getById(filiereId)!;
    setTitle(filiere.name);
    setDescription(filiere.description);
  }, []);

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText}>
        {name}
        {'\n'}
        {'\n'}
      </Text>
      <Text numberOfLines={5}>{description}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FiliereView;
