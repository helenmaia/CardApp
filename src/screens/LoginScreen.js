import React, { Component } from 'react';
import AuthForm from '../ui/AuthForm';
import { login, signup, subscribeToAuthChanges } from '../api/FoodsApi';
import {Image, View} from 'react-native';

class LoginScreen extends Component {

  state = {
    authMode: 'login'
  }

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged)
  }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      this.props.navigation.navigate('App');
    }
  }

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  }
  onClientButton = () => {
      
      this.props.navigation.navigate('AppC');
    }

    
  

  render() {
    return (
     
     
      <AuthForm
        login={login}
        signup={signup}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
        onClientButton={this.onClientButton}
      />

     
    );
  }
}


export default LoginScreen;