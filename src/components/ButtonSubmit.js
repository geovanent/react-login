import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import spinner from '../images/loading.gif';
import UserInput from './UserInput'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLogged: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }


  async _onPress(data) {
    if (this.state.isLoading) return;
    this.props.onPress(data);
    let estado = this.state
    // Consome os dados da api
    const response_dados = await fetch(`https://api.github.com/users/${this.props.user}`);
    // Alert.alert('Agora vai!!', `${this.props.user}:${this.props.password}\n${URL_TO_FETCH}`)
    
    // Transforma os dados recebidos pela API em json
    const json_data = await response_dados.json();

    Alert.alert('Comparação', `${json_data.login}:${this.props.user}`)
    
    // Verifica se os dados recebidos da API equivale alguma coisa então mude o estado do componente
    if(json_data.login == this.props.user){
      this.setState({isLogged: true})
    }
    // end Consome API
    
    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      if(this.state.isLogged){
        this._onGrow();
      }
    }, 2000);

    setTimeout(() => {
      if(this.state.isLogged){
        Actions.secondScreen();
      }else{
        // Alert.alert('Alerta', 'Login Invalido')
      }
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

ButtonSubmit.propTypes = {
  isLoading: PropTypes.bool,
  isLogged: PropTypes.bool,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
