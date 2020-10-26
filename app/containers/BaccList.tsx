import React, {useState} from 'react';
import {View, StyleSheet, FlatList, StatusBar, Dimensions} from 'react-native';
import ListItem from '../components/ListItem';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import LanguageContext from '../languages/LanguageContext';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bacc} from '../db';

type BaccListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'BaccList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: BaccListScreenNavigationProp;
};
// const bacc = [
//   {id: '1', serie: 'A1'},
//   {id: '2', serie: 'A2'},
//   {id: '3', serie: 'C'},
//   {id: '4', serie: 'D'},
//   {id: '5', serie: 'TI'},
//   {id: '6', serie: 'TGC'},
//   {id: '7', serie: 'TA'},
//   {id: '8', serie: 'TT'},
// ];

const BaccList = (props: Props) => {
  const [bacc] = useState(Bacc.getAll());
  function onSelectBacc(id: string, filter: string) {
    props.navigation.navigate('FiliereListView', {id, filter});
  }

  // useEffect(() => {
  //   if (Filiere.shouldUpdateDb()) {
  //     Filiere.populateDb();
  //   }
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Choisissez votre serie Bacc'} />

      <FlatList
        data={bacc}
        contentContainerStyle={bacc.length <= 0 ? {flex: 1} : {}}
        renderItem={({item, index}) => {
          return (
            <ListItem
              key={item.id!}
              title={item.serie}
              onPress={() => onSelectBacc(item.id!, item.serie)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default BaccList;
