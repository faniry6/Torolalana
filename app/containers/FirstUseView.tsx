import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {DatabaseUpdate} from './DatabaseUpdate';
import {Info} from '../db/Info';

const FirstUseView = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function firstUse() {
    Info.setFirstUse(false);
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    if (Info.get().first_use) {
      setModalVisible(true);
    }
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{'Première utilisation'} </Text>
          <Text style={styles.modalText}>
            Bienvenue à Torolalana, votre avenir commence ici. A fin d'obtenir
            les dernières information, nous vous invitons à mettre à jour votre
            base de données. Cela nécessite une petite connexion internet. Vous
            pouvez ensuite utiliser Torolalana hors ligne. Sinon vous pouvez
            toujours aller faire le mise à jour plus tard.
          </Text>
          <DatabaseUpdate />
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              firstUse();
            }}>
            <Text style={styles.textStyle}>Fermez Maintenant</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {marginTop: 20},
  textStyle: {
    color: 'seagreen',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
  },
});
export default FirstUseView;
