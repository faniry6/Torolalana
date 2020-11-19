import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import LanguageContext from '../../../languages/LanguageContext';

const AboutDev = () => {
  const {t} = useContext(LanguageContext);

  async function goToDevURL() {
    try {
      await Linking.openURL('https://github.com/faniry6/UniDir');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.lightGray}>{'Développé par'} </Text>
      <TouchableOpacity onPress={goToDevURL} style={styles.devButton}>
        <Text style={styles.primaryColor}>Ra Faniry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devButton: {
    paddingVertical: 20,
  },
  lightGray: {
    color: '#888',
  },
  primaryColor: {
    color: 'tomato',
  },
});
export default AboutDev;
