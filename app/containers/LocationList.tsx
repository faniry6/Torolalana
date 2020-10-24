import React, {useState, useContext, useCallback} from 'react';
import {View, StyleSheet, FlatList, StatusBar, Dimensions} from 'react-native';
import {Artist} from '../db';
import ListItem from '../components/ListItem';
import TextInputModal from '../components/TextInputModal';
import EmptyListMessage from '../components/EmptyListMessage';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import LanguageContext from '../languages/LanguageContext';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {alertDelete} from '../utils/alertDelete';

type LocationListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'LocationList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: LocationListScreenNavigationProp;
};
const data = [
  {id: '1', location: 'Antananarivo'},
  {id: '2', location: 'Antsirabe'},
  {id: '3', location: 'Fianarantsoa'},
  {id: '4', location: 'Toamasina'},
  {id: '5', location: 'Antsiranana'},
];

const LocationList = (props: Props) => {
  function onSelectLocation(id: string, filter: string) {
    props.navigation.navigate('FiliereListView', {id, filter});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Ou voulez vous etudier?'} />

      <FlatList
        data={data}
        contentContainerStyle={data.length <= 0 ? {flex: 1} : {}}
        renderItem={({item}) => {
          return (
            <ListItem
              key={item.id!}
              title={item.location}
              onPress={() => onSelectLocation(item.id!, item.location)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default LocationList;
