import React, {
  useState,
  useEffect,
  FunctionComponent,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react';
import {FlatList, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ListItem, {LeftIconOptions} from '../components/ListItem';
import {MyFiliere, SortBy} from '../db/MyFiliere';
import TouchableIcon from '../components/TouchableIcon';
import EmptyListMessage from '../components/EmptyListMessage';
import PrimaryButton from '../components/PrimaryButton';
import LanguageContext from '../languages/LanguageContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerModal, {PickerOption} from '../components/PickerModal';
import {Filiere} from '../db';
import {List, Results} from 'realm';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {alertDelete} from '../utils/alertDelete';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {RootStackParamList, MainTabParamList} from '../AppNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

type MyFiliereListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'MyFiliereList'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;

type Props = {
  navigation: MyFiliereListScreenNavigationProp;
};

const MyFiliereList = (props: Props) => {
  const [myfiliere, setFilieres] = useState<MyFiliere>(
    MyFiliere.getByName('MonFiliere')!,
  );

  function onPressRemoveFiliere(id: string) {
    MyFiliere.removeFiliere(myfiliere, Filiere.getById(id)!);
    setFilieres(MyFiliere.getByName('MonFiliere')!);
  }

  function onSelectFiliere(id: string, name: string) {
    props.navigation.navigate('FiliereView', {id, name});
  }

  useFocusEffect(
    useCallback(() => {
      setFilieres(MyFiliere.getByName('MonFiliere')!);
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title={'Mes Filieres'} />
      <FlatList
        contentContainerStyle={myfiliere.filieres.length <= 0 ? {flex: 1} : {}}
        data={myfiliere.filieres}
        ListEmptyComponent={
          <EmptyListMessage
            message={"Vous n'avez pas encore choisi de filiere"}
            // onPress={onPressAddSongs}
            // buttonTitle={t('add_songs').toUpperCase()}
          />
        }
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectFiliere(item.id!, item.filiere)}
              style={styles.item}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.filiere}</Text>
                <Text style={styles.subtitle}>{item.location}</Text>
              </View>
              <TouchableIcon
                onPress={() => {
                  onPressRemoveFiliere(item.id!);
                }}
                name="delete"
              />
            </TouchableOpacity>
            // <ListItem
            //   key={item.id!}
            //   title={item.filiere}
            //   subtitle={item.location}
            //   onPress={() => onSelectFiliere(item.id!, item.filiere)}
            //   options={[
            //     {title: 'Effacer', onPress: () => onPressDeleteSong(item.id!)},
            //   ]}
            // />
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 14,
  },
});
export default MyFiliereList;
