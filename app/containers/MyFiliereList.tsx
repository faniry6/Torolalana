import React, {useState, useCallback} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {MyFiliere} from '../db/MyFiliere';
import TouchableIcon from '../components/TouchableIcon';
import EmptyListMessage from '../components/EmptyListMessage';
import {Filiere} from '../db';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
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
  const [myfiliere, setFilieres] = useState<MyFiliere>(MyFiliere.get()!);

  function onPressRemoveFiliere(id: string) {
    MyFiliere.removeFiliere(Filiere.getById(id)!);
    setFilieres(MyFiliere.get()!);
  }

  function onSelectFiliere(id: string, name: string) {
    props.navigation.navigate('FiliereView', {id, name});
  }

  useFocusEffect(
    useCallback(() => {
      setFilieres(MyFiliere.get()!);
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
