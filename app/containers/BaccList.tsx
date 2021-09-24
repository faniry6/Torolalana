import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import ListItem from '../components/ListItem';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import LanguageContext from '../languages/LanguageContext';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../components/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bacc} from '../db';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FirstUseView from './FirstUseView';
import {Avatar} from 'react-native-elements';

var randomColor = require('randomcolor');

type BaccListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'BaccList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: BaccListScreenNavigationProp;
};

const BaccList = (props: Props) => {
  const [bacc] = useState(Bacc.getAll());
  function onSelectBacc(id: string, filter: string) {
    props.navigation.navigate('FiliereListView', {id, filter});
  }
  const width = Dimensions.get('window').width / 4;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Choisissez votre serie Bacc'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 1,
        }}>
        <FlatList
          data={bacc}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[styles.item]}
                onPress={() => onSelectBacc(item.id!, item.serie)}>
                <View>
                  <Text style={styles.itemText}>{item.serie}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FirstUseView />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 4, // approximate a square
    width: Dimensions.get('window').width / 4,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'white',
    fontSize: Dimensions.get('window').width / 10,
  },

  serie: {
    backgroundColor: 'green',
    margin: 2,
    borderRadius: 0,
    padding: 0,
    fontSize: 2,
  },
});

export default BaccList;
