import React, {useState, useCallback} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {Filiere} from '../db';
import ListItem from '../components/ListItem';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

type FiliereListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'FiliereList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: FiliereListScreenNavigationProp;
};

const FiliereList = (props: Props) => {
  const [filiere, setFiliere] = useState(Filiere.getAll());

  useFocusEffect(
    useCallback(() => {
      setFiliere(Filiere.getAll());
    }, []),
  );

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
              title={item.filiere}
              onPress={() => onSelectFiliere(item.id!, item.filiere)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FiliereList;
