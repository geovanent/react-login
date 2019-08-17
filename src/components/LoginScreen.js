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
      isLogged: false,
    };

    this.onButtonSubmit = this.onButtonSubmit.bind(this)
  }

  updateUser(data) {
    this.setState({user: data.text});
  }

  updatePassword(data) {
    this.setState({password: data.text});
  }

  async onButtonSubmit(data) {
    // Consome os dados da api
    const response_dados = await fetch(`https://api.github.com/users/${this.state.user}`);
    // Alert.alert('Agora vai!!', `${this.props.user}:${this.props.password}\n${URL_TO_FETCH}`)
    
    // Transforma os dados recebidos pela API em json
    const json_data = await response_dados.json();

    // Alert.alert('Comparação', `${json_data.login}:${this.props.user}`)
    
    // Verifica se os dados recebidos da API equivale alguma coisa então mude o estado do componente
    if(json_data.login == this.state.user){
      this.setState({isLogged: true})
    }
    // end Consome API
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
          onPress={this.onButtonSubmit}
          user={this.state.user}
          password={this.state.password}
          logado={this.state.isLogged}
        />
      </Wallpaper>
    );
  }
}
