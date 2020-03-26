import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Picker,
  ToastAndroid,
  Text,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Colors from '../constants/colors';
import BottomBar from '../components/BottomBar';
import Toast from 'react-native-whc-toast';

export default class ReviewScreen extends React.Component {
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
    AsyncStorage.getItem('base').then(value => {
      value = JSON.parse(value);
      this.setState({ base: value });
      this.setState({ priceBaseOg: value.price });
    });
    AsyncStorage.getItem('sauce').then(value => {
      value = JSON.parse(value);
      this.setState({ sauce: value });
    });
    AsyncStorage.getItem('toppings')
      .then(value => {
        value = JSON.parse(value);
        let totPrice = 0;
        value.map(item => {
          totPrice = totPrice + Number(item.price);
        });
        this.setState({ toppings: value, toppingsPrice: totPrice });
      })
      .done(() => {
        this.makeBill();
      });
  }

  makeBill = () => {
    let totalPrice =
      Number(this.state.base.price) +
      Number(this.state.sauce.price) +
      Number(this.state.toppingsPrice);
    totalPrice = Math.round(totalPrice * 100) / 100;
    this.setState({ totalPrice: totalPrice });
    let Gst = Math.round(this.state.totalPrice * 0.12);
    Gst = Math.round(Gst * 100) / 100;
    this.setState({ totalPrice: totalPrice, taxes: Gst });
  };

  handlePayment = async () => {
    let toppings = '';
    await this.state.toppings.map(item => {
      toppings = toppings + item.title + ', ';
    });
    let tid;
    let query =
      'https://unfixed-walls.000webhostapp.com/orderRequest.php?baseid=' +
      this.state.base.id +
      '&toppings=' +
      toppings +
      '&sauceid=' +
      this.state.sauce.id +
      '&userid=' +
      this.state.userid +
      '&slices=' +
      this.state.slices +
      '&size=' +
      this.state.size +
      '&total=' +
      this.state.totalPrice+
      '&payment='+
      this.state.paymentOption;
    console.log(query);
    let query1 =
      'https://unfixed-walls.000webhostapp.com/insertPrices.php?taxes=' +
      this.state.taxes +
      '&packing=' +
      this.state.packing +
      '&basePrice=' +
      this.state.base.price +
      '&saucePrice=' +
      this.state.sauce.price +
      '&toppingsPrice=' +
      this.state.toppingsPrice +
      
      '&tid=';
    fetch(query)
      .then(response => response.json())
      .then(val => (query1 = query1 + val.tid))
      .then(() =>
        fetch(query1)
          .then(val => {
            this.refs.toast.showCenter('Successfully Ordered', Toast.Duration.short)
          })
          .then(() => {
            this.props.navigation.navigate('Home');
          })
          .catch(error => {
            this.refs.toast.showCenter('Failed to place order', Toast.Duration.short)
            
          })
      );
  };

  state = {
    address: '',
    base: {},
    sauce: {},
    userid: null,
    toppings: [],
    priceBaseOg: null,
    toppingsPrice: null,
    totalPrice: null,
    taxes: null,
    slices: 4,
    size: '6',
    packing: 20,
    paymentOption: 'Cash on Delivery',
  };
  showPaymentIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cash on Delivery', 'Pickup From Store', 'Cancel'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState({ paymentOption: 'Cash on Delivery' });
        } else if (buttonIndex == 1) {
          this.setState({ paymentOption: 'Pickup From Store' });
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
        this.setBasePrice();
      }
    );
  };
  updateSlices = slice => {
    this.setState({ slices: slice });
  };

  setBasePrice = () => {
    let basePrice = (this.state.priceBaseOg * Number(this.state.size)) / 6;
    basePrice = Math.round(basePrice * 100) / 100;
    this.setState({ base: { ...this.state.base, price: basePrice } }, () =>
      this.makeBill()
    );
  };

  updateSize = ItemValue => {
    this.setState({ size: ItemValue }, () => this.setBasePrice());
  };

  render() {
    let cuts = ['4', '6', '8', '10', '12'];
    let sizes = ['6', '8', '10', '12', '15', '17', '20'];

    return (
      <View style={styles.container}>
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
                {this.state.base.title} Base
              </Text>
              <Text style={[styles.contentText, { paddingRight: 10 }]}>
                {this.state.base.price}
              </Text>
            </View>
            {/*sauce*/}
            <View style={styles.content}>
              <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                {this.state.sauce.title} Sauce
              </Text>
              <Text style={[styles.contentText, { paddingRight: 10 }]}>
                {this.state.sauce.price}
              </Text>
            </View>
            {/*toppings*/}
            <View style={styles.toppingContent}>
              {this.state.toppings.map(item => {
                return <Topping key={Math.random()} topping={item} />;
              })}
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
                  <Text style={styles.contentText}>
                    {this.state.slices}
                  </Text>
                </TouchableOpacity>
              ) : (
                
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
              ) : (
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
        <Toast ref="toast" />
      </View>
    );
  }
}

class Topping extends React.Component {
  render() {
    return (
      <View style={styles.content}>
        <Text style={[styles.contentText, { paddingLeft: 10 }]}>
          {this.props.topping.title}
        </Text>
        <Text
          style={{
            color: 'white',
            opacity: 0.7,
            fontSize: 16,
            paddingRight: 10,
          }}>
          {this.props.topping.price}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    color: Colors.accent,
  },
  title: {
    color: Colors.accent,
    fontSize: 24,
  },
  card: {
    marginLeft: 10,
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
    width: '50%',
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
});
