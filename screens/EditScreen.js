import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, Modal, ScrollView, StatusBar, Platform, AsyncStorage } from 'react-native';
import Colors from '../constants/colors';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-whc-toast';
import global from '../constants/global';
import { retrieveData } from '../constants/function';
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
export default class EditScreen extends Component {
    static navigationOptions =
        {
            title: "Edit Profile",
        }
    state = {
        email: global.email,
        password: global.password,
        fname: global.fname,
        lname: global.lname,
        address: global.address,
        mobile: global.mobile,
        loading: false,
        respons: "",
        behave: "padding",
    }


    update = async () => {

        const exp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/                         //Email Validaiton expression
        const exp_pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if (this.state.mobile.length == 10) {
            if (exp.test(this.state.email)) {
                if (exp_pass.test(this.state.password)) {
                    //Start Loading 
                    this.setState({ loading: true })
                    fetch("https://unfixed-walls.000webhostapp.com/update.php?id=" + global.userid + "&email=" + this.state.email + "&password=" + this.state.password + "&fname=" + this.state.fname + "&lname=" + this.state.lname + "&mobile=" + this.state.mobile + "&address=" + this.state.address)
                        .then(response => response.json())
                        .then(data => {
                            if (data == "successfull") {

                                this.refs.toast.showBottom('Successfully Updated', Toast.Duration.short);
                                AsyncStorage.setItem('fname', this.state.fname);
                                AsyncStorage.setItem('lname', this.state.lname);
                                AsyncStorage.setItem('pass', this.state.password);
                                AsyncStorage.setItem('address', this.state.address);
                                AsyncStorage.setItem('mobile', this.state.mobile);
                                AsyncStorage.setItem('email', this.state.email);
                                retrieveData();
                                this.props.navigation.navigate("Home")
                            }
                            else {
                                this.refs.toast.showBottom('Invalid Information', Toast.Duration.short);
                            }
                            //Stop Loading
                            this.setState({ loading: false })
                        })
                }
                else {
                    this.setState({ password: "" })
                    this.refs.toast.showBottom('Invalid Password', Toast.Duration.short);
                }
            }
            else {
                this.setState({ email: "" })
                this.refs.toast.showBottom('Invalid Email', Toast.Duration.short);
            }
        }
        else {
            this.setState({ mobile: "" })
            this.refs.toast.showBottom("Please enter 10 digit mobile number", Toast.Duration.short)
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.MainContainer} behavior="padding" keyboardVerticalOffset={Header.HEIGHT + 25}>

                <ScrollView ref="scroll" contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.inputView}>
                        <Text style={styles.text}>First Name:</Text>
                        <TextInput
                            style={styles.inputs}
                            value={this.state.fname}
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
                            value={this.state.lname}
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
                            value={this.state.mobile}
                            keyboardType="number-pad"
                            returnKeyType="next"
                            onChangeText={(mobile) => { this.setState({ mobile: mobile }) }}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>Address:</Text>

                        <TextInput
                            style={styles.inputs}
                            value={this.state.address}
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
                            value={this.state.email}
                            keyboardType="email-address"
                            onChangeText={(email) => {
                                this.setState({ email: email })
                            }}
                            onFocus={() => this.refs.scroll.scrollToEnd()}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.textPassword}>Password:</Text>
                        <TextInput
                            placeholder="6 to 20 with MIN. 1 number and lower and upper case"
                            placeholderTextColor="#262624"
                            style={styles.inputs}
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={(password) => { this.setState({ password: password }) }}
                            onFocus={() => this.refs.scroll.scrollToEnd()}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.update() }} >
                            <Text style={{ fontSize: 24 }}>Update Profile</Text>
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