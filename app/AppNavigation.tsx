import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ArtistList from './containers/ArtistList';
import ArtistView from './containers/ArtistView';
import BaccList from './containers/BaccList';
import FiliereList from './containers/FiliereList';
import LocationList from './containers/LocationList';
import SongView from './containers/SongView';
import SongList from './containers/SongList';
import TabBarIcon from './components/TabBarIcon';
import OnlineSearch from './containers/OnlineSearch';
import SongPreview from './containers/SongPreview';
import FiliereView from './containers/FiliereView';
import OnlineArtistView from './containers/OnlineArtistView';
import SongEdit from './containers/SongEdit';
import PlaylistList from './containers/PlaylistList';
import PlaylistView from './containers/PlaylistView';
import PlaylistAddSongs from './containers/PlaylistAddSongs';
import PlaylistEdit from './containers/PlaylistEdit';
import Settings from './containers/Settings';
import FontSizeSelect from './containers/Settings/FontSizeSelect';
import LanguageContext from './languages/LanguageContext';

export type SettingsStackParamList = {
  Settings: undefined;
  FontSizeSelect: undefined;
};
const SettingsStack = createStackNavigator<SettingsStackParamList>();
const SettingsTab = () => {
  const {t} = useContext(LanguageContext);
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        options={{title: t('settings')}}
        component={Settings}
      />
      <SettingsStack.Screen
        name="FontSizeSelect"
        options={{title: t('text_size')}}
        component={FontSizeSelect}
      />
    </SettingsStack.Navigator>
  );
};
export type MainTabParamList = {
  PlaylistList: undefined;
  ArtistList: undefined;
  SongList: undefined;
  OnlineSearch: undefined;
  Settings: undefined;
  BaccList: undefined;
  FiliereList: undefined;
  LocationList: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();
const MainTab = () => {
  const {t} = useContext(LanguageContext);
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: 'tomato'}}>
      {/* <Tab.Screen
        name="PlaylistList"
        options={{
          title: t('playlists'),
          tabBarIcon: props => <TabBarIcon {...props} name="playlist-music" />,
        }}
        component={PlaylistList}
      /> */}
      {/* <Tab.Screen
        name="ArtistList"
        options={{
          title: t('artists'),
          tabBarIcon: props => <TabBarIcon {...props} name="artist" />,
        }}
        component={ArtistList}
      /> */}
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
      {/* <Tab.Screen
        name="SongList"
        options={{
          title: t('songs'),
          tabBarIcon: props => (
            <TabBarIcon {...props} name="format-list-bulleted-square" />
          ),
        }}
        component={SongList}
      /> */}
      <Tab.Screen
        name="Settings"
        options={{
          title: t('settings'),
          tabBarIcon: props => <TabBarIcon {...props} name="cog" />,
        }}
        component={SettingsTab}
      />
    </Tab.Navigator>
  );
};

export type RootStackParamList = {
  MainTab: undefined;
  OnlineArtistView: {serviceName: string; path: string; title: string};
  SongPreview: {serviceName: string; path: string};
  ArtistView: {id: string; title: string};
  SongView: {id: string; title: string};
  SongEdit: undefined | {id: string};
  PlaylistView: {id: string; title: string};
  PlaylistAddSongs: {id: string};
  PlaylistEdit: {id: string};
  FiliereView: {id: string; name: string};
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
        name="OnlineArtistView"
        component={OnlineArtistView}
        options={({route}) => ({title: route.params.title})}
      />
      <RootStack.Screen
        name="SongPreview"
        component={SongPreview}
        options={{title: t('preview')}}
      />
      <RootStack.Screen
        name="ArtistView"
        component={ArtistView}
        options={({route}) => ({title: route.params.title})}
      />
      <RootStack.Screen
        name="SongView"
        component={SongView}
        options={({route}) => ({title: route.params.title})}
      />
      <RootStack.Screen
        name="FiliereView"
        component={FiliereView}
        options={({route}) => ({title: route.params.name})}
      />
      <RootStack.Screen name="SongEdit" component={SongEdit} />
      <RootStack.Screen
        name="PlaylistView"
        component={PlaylistView}
        options={({route}) => ({title: route.params.title})}
      />
      <RootStack.Screen
        name="PlaylistAddSongs"
        component={PlaylistAddSongs}
        options={{title: t('add_songs')}}
      />
      <RootStack.Screen
        name="PlaylistEdit"
        component={PlaylistEdit}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
export default AppNavigation;
