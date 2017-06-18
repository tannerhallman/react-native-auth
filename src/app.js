import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  // Firebase init
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDAbWur94X47O9M3vubS76EaKffXKrl2tw',
      authDomain: 'react-native-auth-projec-e1f43.firebaseapp.com',
      databaseURL: 'https://react-native-auth-projec-e1f43.firebaseio.com',
      projectId: 'react-native-auth-projec-e1f43',
      storageBucket: 'react-native-auth-projec-e1f43.appspot.com',
      messagingSenderId: '409715020086',
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user){
          this.setState( { loggedIn: true });
        } else {
          this.setState( { loggedIn: false });
        }
    });
  }

  renderContent() {
    switch(this.state.loggedIn){
      case true:
        return (
          <Button onPress= { () => firebase.auth().signOut()}>
              Logout
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        { this.renderContent() }
      </View>
    );
  }
}

export default App;
