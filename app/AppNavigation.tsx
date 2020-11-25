import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import BaccList from './containers/BaccList';
import FiliereList from './containers/FiliereList';
import LocationList from './containers/LocationList';
import TabBarIcon from './components/TabBarIcon';
import MyFiliereList from './containers/MyFiliereList';
import FiliereView from './containers/FiliereView';
import FiliereListView from './containers/FiliereListView';
import LanguageContext from './languages/LanguageContext';
import UpdateInfoView from './containers/UpdateInfoView';

export type MainTabParamList = {
  MyFiliereList: undefined;
  BaccList: undefined;
  FiliereList: undefined;
  LocationList: undefined;
  UpdateInfoView: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();
const MainTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{activeTintColor: 'seagreen'}}
      initialRouteName={'BaccList'}>
      <Tab.Screen
        name="MyFiliereList"
        options={{
          title: 'Mes Filieres',
          tabBarIcon: props => <TabBarIcon {...props} name="bookmark" />,
        }}
        component={MyFiliereList}
      />
      <Tab.Screen
        name="BaccList"
        options={{
          title: 'Bacc',
          tabBarIcon: props => <TabBarIcon {...props} name="school" />,
        }}
        component={BaccList}
      />
      <Tab.Screen
        name="FiliereList"
        options={{
          title: 'Filiere',
          tabBarIcon: props => <TabBarIcon {...props} name="bank" />,
        }}
        component={FiliereList}
      />
      <Tab.Screen
        name="LocationList"
        options={{
          title: 'Location',
          tabBarIcon: props => <TabBarIcon {...props} name="map-marker" />,
        }}
        component={LocationList}
      />
      <Tab.Screen
        name="UpdateInfoView"
        options={{
          title: 'Options',
          tabBarIcon: props => <TabBarIcon {...props} name="cog" />,
        }}
        component={UpdateInfoView}
      />
    </Tab.Navigator>
  );
};

export type RootStackParamList = {
  MainTab: undefined;
  FiliereView: {id: string; name: string};
  FiliereListView: {id: string; filter: string};
  MyFiliereView: {id: string; title: string};
};
const RootStack = createStackNavigator<RootStackParamList>();
const AppNavigation = () => {
  const {t} = useContext(LanguageContext);
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false, title: t('home')}}
      />
      <RootStack.Screen
        name="FiliereView"
        component={FiliereView}
        options={({route}) => ({title: 'Information'})}
      />
      <RootStack.Screen
        name="FiliereListView"
        component={FiliereListView}
        options={({route}) => ({title: route.params.filter})}
      />
    </RootStack.Navigator>
  );
};
export default AppNavigation;
