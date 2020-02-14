import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import Colors from '../constants/colors'

export default class LoginScreen extends Component {

    static navigationOptions = {
        title: "Login",
    }

    state = {
        email: '',
        password: '',
    }

    login=async()=> {
        fetch("https://unfixed-walls.000webhostapp.com/login.php?email=" + this.state.email + "&password=" + this.state.password)
            .then(response => response.json())
            .then(data => {
                const { userid } = data;
                if (userid == null) {
                    ToastAndroid.show('Invalid email/password', ToastAndroid.SHORT);
                } else {
                    AsyncStorage.setItem('userToken', userid);
                    this.props.navigation.navigate('App');
                }
            })
    }

	render() {
        return (
            <View style={styles.MainContainer}>
					<Text style={styles.text}>Email:</Text>
					<View style={styles.inputView}>
						<TextInput
							style={styles.inputs}
							autoFocus
							returnKeyType="next"
                            keyboardType="email-address"
                            onChangeText={(email) => { this.setState({ email: email }) }}
						/>
					</View>
					<Text style={styles.text}>Password:</Text>
					<View style={styles.inputView}>
						<TextInput
                            style={styles.inputs}
                            secureTextEntry
                            onChangeText={(password) => { this.setState({password:password}) }}
						/>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.login() }} >
                        <Text style={{ fontSize: 24 }}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.props.navigation.navigate('Signup') }}>
                        <Text style={{ fontSize:24 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
			</View>
    );
  }
}

 
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#000000',
	},
    inputView: {
		width: '100%',
	},
    inputs: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: Colors.accent,
        borderWidth: 1,
        paddingLeft: 15,
        height: 35,
        color: 'white',
		fontSize: 16,
	},
	text: {
		marginTop: 30,
        color: Colors.accent,
        paddingLeft: 10,
		fontSize: 20,
	},
    button: {
        backgroundColor: Colors.accent,
        color: 'blue',
        width: '89%',
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        height: 40,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonGroup: {
        top: 30,
        width: '100%',
        alignItems: "center",
    },
});