import React, {Component} from 'react';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { Actions } from 'react-native-router-flux';

export default class LoginScreen extends Component {
  constructor(){
    super();
    this.state = {
      user: "",
      password: "",
      isLogged: false,
      isLoading: false,
      isGrowing: false,
      submitText: 'LOGIN'
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
    //Inicia o efeito de loading no botão
    this.setState({isLoading: true, isGrowing: false})

    // Consome os dados da api
    const response_dados = await fetch(`https://api.github.com/users/${this.state.user}`);
    
    // Transforma os dados recebidos pela API em json
    const json_data = await response_dados.json();

    // Alert.alert('Comparação', `${json_data.login}:${this.props.user}`)
    
    // Verifica se os dados recebidos da API equivale alguma coisa então mude o estado do componente
    this.setState({isLogged: (json_data.login == this.state.user)});
    if(json_data.login == this.state.user) {
      this.setState({isGrowing: true})
      setTimeout(() => {
        this.setState({isGrowing: false})
        this.setState({isLoading: false})
        Actions.secondScreen();
      }, 500);
    } else {
      this.setState({isLoading: false, isGrowing: false})
      this.setState({submitText: 'Falha no login'});
      setTimeout(() => {
        this.setState({submitText: 'LOGIN'});
      }, 2000);
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
          onSubmitEditing={this.onButtonSubmit}
        />
        <SignupSection />
        <ButtonSubmit
          submitText={this.state.submitText}
          isGrowing={this.state.isGrowing}
          isLoading={this.state.isLoading}
          onPress={this.onButtonSubmit}
        />
      </Wallpaper>
    );
  }
}
