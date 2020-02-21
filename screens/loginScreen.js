import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ToastAndroid, AsyncStorage, Modal } from 'react-native';
import Colors from '../constants/colors'
import Toast from 'react-native-whc-toast';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
export default class LoginScreen extends Component {

    static navigationOptions = {
        title: "Login",
    }

    state = {
        email: '',
        password: '',
        loading: false,
    }

    login = async () => {
        const exp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/                         //Email Validaiton expression
        const exp_pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if (exp.test(this.state.email)) {
            if (exp_pass.test(this.state.password))                                 //password validation
            {
                this.setState({ loading: true })
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
                        this.setState({ loading: false })
                    })
            }
            else {
                this.setState({ password: "" })
                this.refs.toast.showCenter('Invalid Password', Toast.Duration.short);
            }
        }
        else {
            this.setState({ email: "" })
            this.refs.toast.showCenter('Invalid Email', Toast.Duration.short);
        }
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.text}>Email:</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputs}
                        autoFocus
                        value={this.state.email}
                        returnKeyType="next"
                        keyboardType="email-address"
                        onChangeText={(email) => { this.setState({ email: email }) }}
                    />
                </View>
                <Text style={styles.text}>Password:</Text>
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="6 to 20 with MIN. 1 number and lower and upper case"
                        placeholderTextColor="#262624"
                        style={styles.inputs}
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={(password) => { this.setState({ password: password }) }}
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
                        <Text style={{ fontSize: 24 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.loading &&
                    <Modal visible={this.state.loading}
                        transparent={true}
                        style={{ zindex: 1 }}
                    >
                        <View style={styles.loading}>
                            <MaterialIndicator size={60} animating={this.state.loading} color="white" />
                        </View>
                    </Modal>
                }
                <Toast ref="toast" />
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
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.primary,
        opacity: 0.5
    }
});