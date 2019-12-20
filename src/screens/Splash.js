import React, {Component} from 'react';
import {ImageBackground, ActivityIndicator, StyleSheet} from 'react-native';
import {Container, View, Text} from 'native-base';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      // go to Home page
      this.props.navigation.navigate('Todo');
    }, 1500);
  }

  render() {
    return (
      <Container>
        <View style={styles.View}>
          {/* <Content> */}

          {/* </Content> */}
          <ImageBackground
            style={styles.ImageBackground}
            source={{
              uri:
                'https://image.freepik.com/free-vector/checklist-concept-illustration_114360-339.jpg',
            }}>
            <View style={styles.View2}>
              <ActivityIndicator size="large" color="black" />
              <Text>Loading...</Text>
            </View>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  View: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  View2: {
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackground: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '85%',
    height: '85%',
  },
});
