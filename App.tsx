import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import AppNavigation from './app/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import LanguageContext, {
  LanguageProvider,
} from './app/languages/LanguageContext';
import {GlobalSettings} from './app/db/GlobalSettings';
import {Filiere} from './app/db/Filiere';
import {Bacc} from './app/db';
import AnimatedSplash from 'react-native-animated-splash-screen';

const LoadLanguage = () => {
  const {changeLanguage} = useContext(LanguageContext);
  useEffect(() => {
    let {language} = GlobalSettings.get();
    changeLanguage(language);
  }, []);
  return null;
};

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
      <LanguageProvider>
        <LoadLanguage />
        <LoadDatabase />
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </LanguageProvider>
    </AnimatedSplash>
  );
};
export default App;

// export default class App extends React.Component {
//   const [isLoaded, setIsLoaded] = useState(false);
//   render() {
//     return (
//       <AnimatedSplash
//         translucent={true}
//         isLoaded={this.state.isLoaded}
//         logoImage={require('./app/assets/logo/fianarako-1000x1147.png')}
//         backgroundColor={'white'}
//         logoHeight={150}
//         logoWidth={150}>
//         <LanguageProvider>
//           <LoadLanguage />
//           <LoadDatabase />
//           <NavigationContainer>
//             <AppNavigation />
//           </NavigationContainer>
//         </LanguageProvider>
//       </AnimatedSplash>
//     );
//   }
// }
