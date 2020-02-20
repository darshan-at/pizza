import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, Modal, ScrollView, StatusBar } from 'react-native';
import Colors from '../constants/colors';
import { Header } from 'react-navigation-stack';
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
export default class Signup extends Component {
    static navigationOptions =
        {
            title: "Sign Up",
        }
    state = {
        email: "",
        password: "",
        fname: "",
        lname: "",
        address: "",
        mobile: "",
        loading: false,
        respons: "",
        behave: "padding",
    }
    signup = async () => {
        this.setState({ loading: true })
        fetch("https://unfixed-walls.000webhostapp.com/signup.php?email=" + this.state.email + "&password=" + this.state.password + "&fname=" + this.state.fname + "&lname=" + this.state.lname + "&mobile=" + this.state.mobile + "&address=" + this.state.address)
            .then(response => response.json())
            .then(data => {
                if (data == "successfull") {
                    ToastAndroid.show('Successfully registered', ToastAndroid.SHORT);
                    this.props.navigation.navigate("Login")
                }
                else {
                    ToastAndroid.show('Invalid information', ToastAndroid.SHORT);
                }
                this.setState({ loading: false })
            })


    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={Header.HEIGHT + 25}>

                <ScrollView ref="scroll" contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.inputView}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.inputs}
                            autoFocus
                            returnKeyType="next"
                            keyboardType="default"
                            onChangeText={(fname) => { this.setState({ fname: fname }) }}

                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text style={styles.text}>Last Name:</Text>
                        <TextInput
                            style={styles.inputs}
                            returnKeyType="next"
                            keyboardType="default"
                            onChangeText={(lname) => { this.setState({ lname: lname }) }}
                            onFocus={() => this.refs.scroll.scrollTo({ x: 0, y: 0 })}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <Text style={styles.text}>Mobile Number:</Text>

                        <TextInput
                            style={styles.inputs}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            onChangeText={(mobile) => {
                                
                                    this.setState({ mobile: mobile })
                               
                            }}    
                            />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>Address:</Text>

                        <TextInput
                            style={styles.inputs}
                            keyboardType="default"
                            returnKeyType="next"
                            onChangeText={(address) => { this.setState({ address: address }) }}

                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>Email:</Text>

                        <TextInput
                            style={styles.inputs}
                            returnKeyType="next"
                            keyboardType="email-address"
                            onChangeText={(email) => { this.setState({ email: email }) }}
                            onFocus={() => this.refs.scroll.scrollToEnd()}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.textPassword}>Password:</Text>
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry
                            onChangeText={(password) => { this.setState({ password: password }) }}
                            onFocus={() => this.refs.scroll.scrollToEnd()}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.signup() }} >
                            <Text style={{ fontSize: 24 }}>Sign Up</Text>
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
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#000000',
        flexDirection: "column",
        justifyContent: "center",
    },
    inputView: {
        width: '100%',

    },
    inputs: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: Colors.accent,
        borderWidth: 1,
        paddingLeft: "4%",
        height: 35,
        color: 'white',
        fontSize: 16,
    },
    text: {
        marginTop: "4%",
        color: Colors.accent,
        paddingLeft: "4%",
        fontSize: 20,
    },
    textPassword: {
        marginTop: "4%",
        color: Colors.accent,
        paddingLeft: "4%",
        fontSize: 20,
    },
    button: {
        backgroundColor: Colors.accent,
        width: '89%',
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        height: "25%",
        borderRadius: 10,
        marginTop: "1%",
    },
    buttonGroup: {
        top: "3%",
        width: '100%',
        alignItems: "center",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.primary,
        opacity: 0.5,


    }
});