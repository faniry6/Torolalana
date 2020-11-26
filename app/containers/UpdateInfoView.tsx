import React from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, StatusBar, View, Text, Alert} from 'react-native';
import {MainTabParamList, RootStackParamList} from '../AppNavigation';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Dimensions, TouchableOpacity, Linking} from 'react-native';
import {DatabaseUpdate} from './DatabaseUpdate';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

const windowWidth = Dimensions.get('window').width;

type UpdateInfoScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'UpdateInfoView'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;
type Props = {
  navigation: UpdateInfoScreenNavigationProp;
};

const TermsOfUse = () => {
  async function goToTermsURL() {
    try {
      await Linking.openURL(
        'https://faniry6.github.io/Torolalana/terms_and_conditions',
      );
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={goToTermsURL}>
        <Text style={styles.primaryColor}>Conditions d'utilisation</Text>
      </TouchableOpacity>
    </View>
  );
};

const Dev = () => {
  async function goToDevURL() {
    try {
      await Linking.openURL('https://github.com/faniry6/Torolalana');
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={goToDevURL}>
        <Text style={styles.primaryColor}>Ra Faniry</Text>
      </TouchableOpacity>
    </View>
  );
};

const UpdateInfo = (props: Props) => {
  const Separator = ({title}: {title: string}) => (
    <View style={styles.separator}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeader title={'A Propos'} />
      <View style={styles.content}>
        <ScrollView>
          <View
            style={{
              width: (1.9 * windowWidth) / 3,
              height: 130,
              flex: 1,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/logo/uni-tana.png')}
              style={styles.image}
            />
            <Text style={styles.text}>
              Tous les données actuelles ont été directement collectées au pres
              des départements respectives. En cas de doutes veuillez contacter
              directement le departement concerne ou utiliser le contact suivant
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'center'}}>Contact: talin@aims.ac.za</Text>
          </View>

          <Separator title="Base de données" />
          <DatabaseUpdate />
          <Separator title="Termes et conditions" />
          <View>
            <Text style={styles.text}>Cette application est développé par</Text>
            {Dev()}
            <Text style={styles.text}>
              En utilisant cette application, vous acceptez les conditions
              suivantes
            </Text>
            {TermsOfUse()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  head: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width / 20,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'left',
    marginVertical: 8,
  },
  image: {
    width: windowWidth / 4,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    fontSize: 25,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  container_term: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devButton: {
    paddingVertical: 10,
  },
  lightGray: {
    color: '#888',
  },
  primaryColor: {
    color: 'tomato',
  },
});

export default UpdateInfo;
