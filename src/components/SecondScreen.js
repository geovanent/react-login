import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  Easing,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Api from './api';
import arrowImg from '../images/left-arrow.png';

const SIZE = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class SecondScreen extends Component {
  constructor() {
    super();
    this.api = new Api({baseUrl: 'https://reqres.in/api'});
    this.state = {
      isLoading: true,
      userList: [],
    };

    this._onPress = this._onPress.bind(this);
    this.growAnimated = new Animated.Value(0);
  }

  async componentDidMount() {
    //Have a try and catch block for catching errors.
    // try {
        //Assign the promise unresolved first then get the data using the json method. 
        
        this.setState({isLoading: true});
        this.api.getProfile()
          .then(({ data }) => {
            // console.log('data -> ', data);
            this.setState({userList: data, isLoading: false});
          });
    // } catch(err) {
    //     console.log("Error fetching data-----------", err);
    // }
}

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      Actions.pop();
    }, 500);
  }

  renderItem(data) {
      return <TouchableOpacity style={{backgroundColor: 'transparent'}}>
                  <View  style={styles.listItemContainer}>
                    <Image source={{uri: data.item.avatar}} 
                                style={styles.pokeImage}/>
                    <View style={{paddingLeft:20}}>
                      <Text style={[styles.pokeItemHeader, {fontSize: 15}]}>{data.item.first_name} {data.item.last_name}</Text>
                      <Text style={styles.pokeItemHeader}>{data.item.email}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });
    const { userList, isLoading } = this.state;
    if(!isLoading) {
      return (
      <View style={styles.container}>
        <FlatList
          style={{width: DEVICE_WIDTH}}
          data={userList.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()} 
        />
        {/* <TouchableOpacity
          onPress={this._onPress}
          style={styles.button}
          activeOpacity={1}>
          <Image style={styles.image} source={arrowImg} />
        </TouchableOpacity>
        <Animated.View
          style={[styles.circle, {transform: [{scale: changeScale}]}]}
        /> */}
      </View>
      );
    } else {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator color={'blue'} size={100}/>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  image: {
    width: 24,
    height: 24,
  },
  listItemContainer: {
    borderStyle: 'solid',
    borderColor: '#fff',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20
  },
  pokeItemHeader: {
      color: 'black',
      fontSize: 10,
  },
  pokeImage: {
      backgroundColor: 'transparent',
      borderRadius: 100,
      height: 50,
      width: 50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});
