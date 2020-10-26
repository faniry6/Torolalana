import React, {useState, useContext, FC} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import ListItem from '../components/ListItem';
import LanguageContext from '../languages/LanguageContext';
import {RouteProp, CurrentRenderContext} from '@react-navigation/native';
import {RootStackParamList} from '../AppNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {alertDelete} from '../utils/alertDelete';
import {Filiere, Bacc} from '../db';

type FiliereListViewScreenRouteProp = RouteProp<
  RootStackParamList,
  'FiliereListView'
>;
type FiliereListViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FiliereListView'
>;
type Props = {
  route: FiliereListViewScreenRouteProp;
  navigation: FiliereListViewScreenNavigationProp;
};

const FiliereListView: FC<Props> = props => {
  let id = props.route.params.id;
  let filter = props.route.params.filter;
  let filiere;

  if (Bacc.search(filter).length > 0) {
    filiere = Filiere.getByBacc(filter);
  } else {
    filiere = Filiere.getByLocation(filter);
  }

  function onSelectFiliere(id: string, name: string) {
    props.navigation.navigate('FiliereView', {id, name});
  }

  return (
    <FlatList
      data={filiere}
      renderItem={({item}) => {
        return (
          <ListItem
            key={item.id!}
            title={item.name}
            onPress={() => onSelectFiliere(item.id!, item.name)}
          />
        );
      }}
      ListEmptyComponent={
        <View style={styles.MainContainer}>
          <Text style={{textAlign: 'center'}}>
            Pas encore de donnees! Bientot!
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
});
export default FiliereListView;
