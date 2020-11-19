import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'Choisissez votre serie Bacc'} />
      <FlatList
        data={bacc}
        numColumns={3}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.item, {backgroundColor: randomColor()}]}
              onPress={() => onSelectBacc(item.id!, item.serie)}>
              <View>
                <Text style={styles.itemText}>{item.serie}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 3, // approximate a square
    width: Dimensions.get('window').width / 3,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
    fontSize: Dimensions.get('window').width / 20,
  },
});

export default BaccList;
