import React from 'react';
import {FlatList, StatusBar} from 'react-native';
import ListItem from '../components/ListItem';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  {id: '3', location: 'Soavinandriana'},
];

const LocationList = (props: Props) => {
  function onSelectLocation(id: string, filter: string) {
    props.navigation.navigate('FiliereListView', {id, filter});
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Où voulez-vous étudier ?'} />

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
