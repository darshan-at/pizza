import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Picker,
  Text,
  Platform,
  Modal,
  ActionSheetIOS,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/colors';
import BottomBar from '../components/BottomBar';
import Toast from 'react-native-whc-toast';

export default class ReviewOrderPizza extends React.Component {
  static navigationOptions = {
    title: 'Review',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('userToken').then(data => {
      this.setState({ userid: data });
    });
    AsyncStorage.getItem('address').then(data => {
      this.setState({ address: data });
    });
    AsyncStorage.getItem('pizza')
      .then(value => {
        value = JSON.parse(value);
        this.setState({ pizza: value });
        this.setState({ priceOg: Number(value.price) });
      })
      .done(() => {
        this.makeBill();
      });
  }

  makeBill = () => {
    let total = (this.state.priceOg * this.state.size) / 6;
    total = Math.round(total * 100) / 100;
    let Gst = Math.round(total * 0.12);
    Gst = Math.round(Gst * 100) / 100;
    this.setState({ totalPrice: total, taxes: Gst });
  };

  handlePayment = async () => {
    this.setState({loading:true})
    let query =
      'https://unfixed-walls.000webhostapp.com/orderPizza.php?pizzaid=' +
      this.state.pizza.id +
      '&price=' +
      this.state.totalPrice +
      '&packing=' +
      this.state.packing +
      '&amount=' +
      this.state.totalPrice +
      '&taxes=' +
      this.state.taxes +
      '&slices=' +
      this.state.slices +
      '&size=' +
      this.state.size +
      '&payment=' +
      this.state.paymentOption +
      '&userid=' +
      this.state.userid;
    fetch(query)
      .then(() => console.log(query))
      
      .then(val => {
        this.refs.toast.showCenter('Successfully Ordered', Toast.Duration.short)
      }).then(this.setState({loading:false}))
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.refs.toast.showCenter('Failed to place order', Toast.Duration.short)
      });
  };
  state = {
    address: '',
    userid: null,
    priceOg: null,
    totalPrice: null,
    pizza: {},
    taxes: null,
    slices: 4,
    size: '6',
    packing: 20,
    paymentOption: 'Cash on Delivery',
    loading:false,
  };
  showPaymentIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cash on Delivery', 'Pickup from store', 'Cancel'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState({ paymentOption: 'Cash on Delivery' });
        } else if (buttonIndex == 1) {
          this.setState({ paymentOption: 'Pickup from store' });
        }
      }
    );
  };
  showSlicesIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['4', '6', '8', '10', '12', 'Cancel'],
        cancelButtonIndex: 5,
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState({ slices: 4 });
        } else if (buttonIndex == 1) {
          this.setState({ slices: 6 });
        } else if (buttonIndex == 2) {
          this.setState({ slices: 8 });
        } else if (buttonIndex == 3) {
          this.setState({ slices: 10 });
        } else if (buttonIndex == 4) {
          this.setState({ slices: 12 });
        }
      }
    );
  };
  showSizesIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['6', '8', '10', '12', '15', '17', '20', 'Cancel'],
        cancelButtonIndex: 7,
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState({ size: '6' });
        } else if (buttonIndex == 1) {
          this.setState({ size: '8' });
        } else if (buttonIndex == 2) {
          this.setState({ size: '10' });
        } else if (buttonIndex == 3) {
          this.setState({ size: '12' });
        } else if (buttonIndex == 4) {
          this.setState({ size: '15' });
        } else if (buttonIndex == 5) {
          this.setState({ size: '17' });
        } else if (buttonIndex == 6) {
          this.setState({ size: '20' });
        }
        this.makeBill()
      }
    );
  };
  updateSlices = slice => {
    this.setState({ slices: slice });
  };

  updateSize = ItemValue => {
    this.setState({ size: ItemValue }, () => this.makeBill());
  };

  render() {
    let cuts = ['4', '6', '8', '10', '12'];
    let sizes = ['6', '8', '10', '12', '15', '17', '20'];
    
    return (
      <View style={styles.maincontainer}>
        <ScrollView style={styles.Container}>
          {/*payment options*/}
          <View style={styles.card}>
            <Text
              style={{
                color: Colors.accent,
                fontSize: 16,
                paddingLeft: 10,
                paddingBottom: 10,
              }}>
              Payment Options
            </Text>
            
            {Platform.OS == 'ios' ? (
              <TouchableOpacity
                onPress={this.showPaymentIOS}
                style={styles.pickerIOS}>
                <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                  {this.state.paymentOption}
                </Text>
              </TouchableOpacity>
            ) : (
              <Picker
                style={[styles.picker, { width: '80%', borderColor: 'red' }]}
                selectedValue={this.state.paymentOption}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({ paymentOption: itemValue });
                }}>
                <Picker.Item
                  key={Math.random()}
                  label="Cash on Delivery"
                  value="Cash on Delivery"
                />
                <Picker.Item
                  key={Math.random()}
                  label="Pickup from store"
                  value="Pickup from store"
                />
              </Picker>
            )}
          </View>

          {/*content card*/}
          <View style={styles.card}>
            <Text style={{ color: Colors.accent, fontSize: 18 }}>Contents</Text>
            {/*base*/}
            <View style={styles.content}>
              <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                {this.state.pizza.title}
              </Text>
              <Text style={[styles.contentText, { paddingRight: 10 }]}>
                {this.state.pizza.price}
              </Text>
            </View>
          </View>

          {/*slices and size*/}
          <View
            style={[
              styles.card,
              { flexDirection: 'row', justifyContent: 'space-around' },
            ]}>
            {/*slices*/}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: Colors.accent, fontSize: 16 }}>
                Slices:
              </Text>
                {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  style={styles.pickerIOS}
                  onPress={this.showSlicesIOS}>
                  <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                    {this.state.slices}
                  </Text>
                </TouchableOpacity>
              ):(
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.slices}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    this.updateSlices(itemValue);
                  }}>
                  {cuts.map(item => {
                    return (
                      <Picker.Item
                        key={Math.random()}
                        label={item}
                        value={item}
                      />
                    );
                  })}
                </Picker>
              )}
            </View>
            {/*size*/}
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.accent, fontSize: 16 }}>Size:</Text>
              
              {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  style={styles.pickerIOS}
                  onPress={this.showSizesIOS}>
                  <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                    {this.state.size}
                  </Text>
                </TouchableOpacity>
              ) : 
              (
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.size}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    this.updateSize(itemValue);
                  }}>
                  {sizes.map(item => {
                    return (
                      <Picker.Item
                        key={Math.random()}
                        label={item}
                        value={item}
                      />
                    );
                  })}
                </Picker>
              )}
            </View>
          </View>

          {/*Bill*/}
          <View style={styles.card}>
            <Text
              style={{ color: Colors.accent, fontSize: 16, paddingLeft: 10 }}>
              Detailed Bill
            </Text>
            <View>
              <View style={styles.content}>
                <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                  Order total
                </Text>
                <Text style={[styles.contentText, { paddingRight: 10 }]}>
                  {this.state.totalPrice}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                  Packing and Delivery
                </Text>
                <Text style={[styles.contentText, { paddingRight: 10 }]}>
                  20
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                  Taxes
                </Text>
                <Text style={[styles.contentText, { paddingRight: 10 }]}>
                  {this.state.taxes}
                </Text>
              </View>
              <View style={styles.content}>
                <Text
                  style={[
                    styles.contentText,
                    { paddingLeft: 10, color: Colors.accent, opacity: 1 },
                  ]}>
                  Grand Total
                </Text>
                <Text
                  style={[
                    styles.contentText,
                    { paddingRight: 10, color: Colors.accent, opacity: 1 },
                  ]}>
                  {this.state.totalPrice +
                    this.state.taxes +
                    this.state.packing}
                </Text>
              </View>
            </View>
          </View>

          {/*address card*/}
          <View style={styles.card}>
            <Text style={{ color: Colors.accent, fontSize: 18 }}>
              Delivering To:
            </Text>
            <Text style={styles.contentText}>{this.state.address}</Text>
          </View>
        </ScrollView>
        <BottomBar onPressing={() => this.handlePayment()}>
          Confirm Order
        </BottomBar>
        <Toast ref="toast"/>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    color: Colors.accent,
  },
  
  Container: {
    paddingHorizontal: 5,
    marginBottom: 60,
  },
  topping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#171717',
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pickerIOS: {
    width: '100%',
    color: 'white',
    height: 20,
  },
  picker: {
    width: 100,
    color: 'white',
    height: 20,
  },
  contentText: {
    color: 'white',
    opacity: 0.7,
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    opacity: 0.5
}
});
