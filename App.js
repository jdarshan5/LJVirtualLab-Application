import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import AppNavigationContainer from './components/app_navigator';

import Context from './components/context';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      setIsLoggedIn: this.setIsLoggedIn,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.fetchIsLoggedIn().then(() => {
        SplashScreen.hide();
      });
    }, 1000);
  }

  setIsLoggedIn = (value) => {
    this.setState({ isLoggedIn: value });
  }

  fetchIsLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ isLoggedIn: token ? true : false });
  }

  render() {
    return(
      <Context.Provider 
        value={this.state} >
        <AppNavigationContainer />
      </Context.Provider>
    )
  }
}

export default App;
