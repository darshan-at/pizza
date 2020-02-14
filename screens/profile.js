import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
export default class Profile extends Component {

  static navigationOptions= {
    title: "Profile",
  }

    handleSignOut = async() => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

  render() {
    return (
      <View style={styles.MainContainer}>
            <Text style={{ fontSize: 23 }}> Profile </Text>
            <TouchableOpacity onPress={() => {
                this.handleSignOut()
                console.log('sign out')
            }}><Text>Sign out</Text></TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});