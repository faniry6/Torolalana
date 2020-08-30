import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, StatusBar, Dimensions} from 'react-native';
import {Filiere} from '../db';
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

type FiliereListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'FiliereList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: FiliereListScreenNavigationProp;
};

const FiliereList = (props: Props) => {
  const [filiere, setArtists] = useState(Filiere.getAll());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Filiere.shouldUpdateDb()) {
      Filiere.populateDb();
      setArtists(Filiere.getAll());
    }
    setIsLoading(false);
  }, [isLoading]);
  function onSelectFiliere(id: string, name: string) {
    props.navigation.navigate('FiliereView', {id, name});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Quelle filiere poursuivre?'} />

      <FlatList
        data={filiere}
        contentContainerStyle={filiere.length <= 0 ? {flex: 1} : {}}
        renderItem={({item}) => {
          return (
            <ListItem
              key={item.id!}
              title={item.name}
              onPress={() => onSelectFiliere(item.id!, item.name)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FiliereList;
