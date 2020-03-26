import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';
import colors from '../constants/colors';
import { Icon } from 'react-native-elements';
import {
  MaterialIndicator,
} from 'react-native-indicators';

let _this = null;

export default class Profile extends React.Component {

  state = {
    userid: null,
    user: {},
    loading: true,
  }

  componentDidMount() {
    _this = this

    AsyncStorage.getItem("userToken")
      .then((data) => this.setState({ userid: data }))
      .then(() => {

        fetch("https://unfixed-walls.000webhostapp.com/getUser.php?userid=" + this.state.userid)
          .then((response) => response.json())
          .then((val) => this.setState({ user: val }))
          .then(() => { this.setState({ loading: false }) })


      })

  }
  handleSignOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerRight: (
        <Icon
          containerStyle={{ paddingRight: 10 }}
          name="sign-out"
          type="font-awesome"
          color={colors.accent}
          underlayColor={colors.primary}
          onPress={() => _this.handleSignOut()}
        />
      ),
    };
  };

  render() {
    return (
      <View style={styles.MainContainer}>

        <View style={styles.headerImage}>
          <Image
            style={styles.profilePic}
            source={{
              uri:
                'https://unfixed-walls.000webhostapp.com/profile.png',
            }}
          />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text
              style={{
                color: colors.accent,
                fontSize: 25,
                paddingLeft: '1%',
                textAlignVertical: 'center',
              }}>
              {this.state.user.fname + ' ' + this.state.user.lname}
            </Text>
          </View>
        </View>
        <View style={styles.infomation}>
          <View
            style={{
              borderWidth: 2,
              borderBottomColor: '#a19e9a',
              height: '10%',
              alignContent: "center",
              borderRadius: 10,
              flexDirection: "row"
            }}>

            <Text
              style={{ color: colors.accent, fontSize: 20, paddingLeft: '3%' }}>
              Customer Information
            </Text>
            <Icon
              containerStyle={{ alignSelf: "center", position: "absolute", right: 0 }}
              name="edit"
              type="font-awesome"
              color={colors.accent}
              underlayColor={colors.primary}
              onPress={() => this.props.navigation.push('EditProfile')}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Email</Text>
            <Text style={styles.textValue}>{this.state.user.email}</Text>
          </View>

          {/*<View style={styles.card}>
            <Text style={styles.textKey}>Password</Text>
            <Text style={styles.textValue}>{global.password}</Text>
          </View>*/}

          <View style={styles.card}>
            <Text style={styles.textKey}>Mobile Number</Text>
            <Text style={styles.textValue}>{this.state.user.mobileNo}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Address</Text>
            <Text style={styles.textValue}>{this.state.user.address}</Text>
          </View>

          <View
            style={{
              borderWidth: 2,
              borderRadius: 35,
              backgroundColor: colors.accent,
              borderColor: colors.accent,
              width: '60%',
              alignSelf: 'center',
              alignItems: 'center',
              height: '10%',
              justifyContent: 'center',
              marginBottom: '2%',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('History');
              }}>
              <Text
                style={{
                  color: colors.bgcolor,
                  fontSize: 20,
                  paddingLeft: '3%',
                  fontWeight: '700',
                }}>
                View Order History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          this.state.loading &&
          <Modal visible={this.state.loading}
            transparent={true}
            style={{ zindex: 1 }}
          >
            <View style={styles.loading}>
              <MaterialIndicator size={60} animating={this.state.loading} color={colors.textColor} />
            </View>
          </Modal>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: colors.accent,
    backgroundColor: colors.bgcolor,
    alignItems: 'center',
  },
  headerImage: {
    backgroundColor: colors.shade,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: '1%',
    width: '95%',
    height: '36%',
    alignItems: 'center',
  },
  profilePic: {
    width: "50%",
    height: "80%",
    borderRadius: 500,
  },
  infomation: {
    backgroundColor: colors.shade,
    marginTop: '2%',
    borderRadius: 10,
    borderWidth: 2,
    width: '95%',
    height: '64%',
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    justifyContent: 'center',
    paddingLeft: '3%',
  },
  textKey: {
    fontWeight: 'bold',
    color: colors.accent,
    fontSize: 21,
  },
  textValue: {
    color: colors.textColor,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary,
    opacity: 0.5
  }
});
