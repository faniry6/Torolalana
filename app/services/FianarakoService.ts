import axios from 'axios';
import {BaseService, FiliereDoc} from './BaseService';
import React, {useState, FC, useCallback} from 'react';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {MainTabParamList, RootStackParamList} from '../AppNavigation';
import {services, getService} from '../services';
import {Filiere} from '../db/Filiere';
import {Info} from '../db/Info';
import realm from '../db';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Dimensions, TouchableOpacity, Linking} from 'react-native';

export default class FianarakoService extends BaseService {
  constructor() {
    super();
    this.name = 'Fianarako';
    this.baseUrl =
      'https://by4tg2z1s4.execute-api.eu-central-1.amazonaws.com/dev';
  }

  async getAll(): Promise<FiliereDoc[]> {
    const result = await axios.get(this.baseUrl + '/api/v1/filiere/');
    return result.data.data;
  }
}
