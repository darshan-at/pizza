import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Image,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import global from '../constants/global';
import colors from '../constants/colors';
import { Icon } from 'react-native-elements';
let _this = null;

export default class Profile extends React.Component {
  componentDidMount() {
    _this = this;
  }
  handleSignOut = async () => {
    await AsyncStorage.clear();
    global.userid = null;
    global.email = null;
    global.fname = null;
    global.lname = null;
    global.address = null;
    global.mobile = null;
    global.password = null;
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
          color="#fa9933"
          underlayColor="#121212"
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
                'https://i7.pngguru.com/preview/507/702/502/5bbc352450cbf.jpg',
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
              {global.fname + ' ' + global.lname}
            </Text>
          </View>
        </View>
        <View style={styles.infomation}>
          <View
            style={{
              borderWidth: 2,
              borderBottomColor: '#a19e9a',
              height: '10%',
              alignContent:"center",
              borderRadius: 10,
              flexDirection:"row"
            }}>
             
            <Text
              style={{ color: colors.accent, fontSize: 20, paddingLeft: '3%' }}>
              Customer Information
            </Text>
            <Icon 
              containerStyle={{alignSelf:"center",position:"absolute",right:0}}
              name="edit"
              type="font-awesome"
              color="#fa9933"
              underlayColor="#121212"
              onPress={()=>this.props.navigation.push('EditProfile')}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Email</Text>
            <Text style={styles.textValue}>{global.email}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Password</Text>
            <Text style={styles.textValue}>{global.password}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Mobile Number</Text>
            <Text style={styles.textValue}>{global.mobile}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.textKey}>Address</Text>
            <Text style={styles.textValue}>{global.address}</Text>
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
                  color: 'black',
                  fontSize: 20,
                  paddingLeft: '3%',
                  fontWeight: '700',
                }}>
                  View Order History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  headerImage: {
    backgroundColor: '#171717',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: '1%',
    width: '95%',
    height: '36%',
    alignItems: 'center',
  },
  profilePic: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  infomation: {
    backgroundColor: '#171717',
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
    color: 'white',
    fontSize: 16,
  },
});
