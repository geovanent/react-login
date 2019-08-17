import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import {
  Alert,
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(){
    super();
    this.state = {
      user: "",
      password: "",
    };
  }

  updateUser(data) {
    this.setState({user: data.text});
  }

  updatePassword(data) {
    this.setState({password: data.text});
  }

  onButtonSubmit(data) {
    //Faz nada
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form 
          onChangeUser={this.updateUser.bind(this)}
          onChangePassword={this.updatePassword.bind(this)}
        />
        <SignupSection />
        <ButtonSubmit 
          onPress={this.onButtonSubmit.bind(this)}
          user={this.state.user}
          password={this.state.password}
        />
      </Wallpaper>
    );
  }
}
