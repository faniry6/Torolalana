import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import AppNavigation from './app/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Filiere} from './app/db/Filiere';
import {Bacc} from './app/db';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {View} from 'react-native';

const LoadDatabase = () => {
  useEffect(() => {
    if (Filiere.shouldUpdateDb()) {
      Filiere.populateDb();
    }
    if (Bacc.shouldUpdateDb()) {
      Bacc.populateDb();
    }
  }, []);
  return null;
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={'white'}
      logoImage={require('./app/assets/logo/uni-tana.png')}
      logoHeight={150}
      logoWidth={150}>
      <NavigationContainer>
        <LoadDatabase />
        <AppNavigation />
      </NavigationContainer>
    </AnimatedSplash>
  );
};
export default App;
