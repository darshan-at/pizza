import React from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
    ScrollView,
    Picker,
    ToastAndroid,
    Text,
} from 'react-native'
import Colors from '../constants/colors'
import BottomBar from '../components/BottomBar'



export default class ReviewScreen extends React.Component {

    static navigationOptions = {
        title: "Review"
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken')
            .then((data) => {
                this.setState({ userid: data })
            })
        AsyncStorage.getItem("pizza").then((value) => {
            value = JSON.parse(value)
            this.setState({ pizza: value })
            this.setState({ priceOg: Number(value.price) })
        })
            .done(() => {
                this.makeBill();
            })
    }

    makeBill = () => {
        let total = this.state.priceOg * this.state.size / 6;
        total = Math.round(total * 100) / 100
        let Gst = Math.round(total * 0.12)
        Gst = Math.round(Gst * 100) / 100
        let packing = 20
        this.setState({ totalPrice: total, taxes: Gst })
    }

    handlePayment = async () => {
        let query = "https://unfixed-walls.000webhostapp.com/orderPizza.php?pizzaid=" + this.state.pizza.id
            + "&price=" + this.state.totalPrice + "&packing=" + this.state.packing
            + "&amount=" + this.state.totalPrice + "&taxes=" + this.state.taxes
            + "&slices=" + this.state.slices + "&size=" + this.state.size + "&userid=" + this.state.userid
        fetch(query)
            .then(()=>console.log(query))
            .then((val) => { ToastAndroid.show('Successfully Ordered', ToastAndroid.SHORT); })
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => { ToastAndroid.show('Failed to place order', ToastAndroid.SHORT); })
    }

    state = {
        address: "lorem ipsum dolor sit amet",
        userid: null,
        priceOg: null,
        totalPrice: null,
        pizza: {},
        taxes: null,
        slices: 4,
        size: '6',
        packing: 20,
        paymentOption: "cod",
    }

    updateSlices = (slice) => {
        this.setState({ slices: slice })
    }

    updateSize = (ItemValue) => {
        this.setState({ size: ItemValue }, () => this.makeBill())
    }

    render() {

        let cuts = ["4", "6", "8", "10", "12"];
        let sizes = ['6', '8', '10', '12', '15', '17', '20'];

        return (
            <View style={styles.container}>
                <ScrollView style={styles.Container}>

                    {/*payment options*/}
                    <View style={styles.card}>
                        <Text style={{ color: Colors.accent, fontSize: 16, paddingLeft: 10, paddingBottom: 10 }}>
                            Payment Options</Text>
                        <Picker
                            style={[styles.picker, { width: '80%' }]}
                            selectedValue={this.state.paymentOption}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => { this.setState({ paymentOption: itemValue }) }}
                        >
                            <Picker.Item key={Math.random()} label="Cash on Delivery" value="cod" />
                            <Picker.Item key={Math.random()} label="Takeout from store" value="takeout" />
                            <Picker.Item key={Math.random()} label="Cash on Delivery" value="cod" />

                        </Picker>
                    </View>

                    {/*content card*/}
                    <View style={styles.card}>
                        <Text style={{ color: Colors.accent, fontSize: 18, }}>Contents</Text>
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
                    <View style={[styles.card, { flexDirection: "row", justifyContent: "space-around" }]}>
                        {/*slices*/}
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text style={{ color: Colors.accent, fontSize: 16 }}>
                                Slices:
                        </Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.slices}
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => { this.updateSlices(itemValue) }}>
                                {cuts.map((item) => {
                                    return (<Picker.Item key={Math.random()} label={item} value={item} />
                                    )
                                })}
                            </Picker>
                        </View>
                        {/*size*/}
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: Colors.accent, fontSize: 16 }}>
                                Size:
                        </Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.size}
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => { this.updateSize(itemValue) }}>
                                {sizes.map((item) => {
                                    return (<Picker.Item key={Math.random()} label={item} value={item} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>

                    {/*Bill*/}
                    <View style={styles.card}>
                        <Text style={{ color: Colors.accent, fontSize: 16, paddingLeft: 10 }}>Detailed Bill</Text>
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
                                <Text style={[styles.contentText, { paddingLeft: 10, color: Colors.accent, opacity: 1 }]}>
                                    Grand Total
                            </Text>
                                <Text style={[styles.contentText, { paddingRight: 10, color: Colors.accent, opacity: 1 }]}>
                                    {this.state.totalPrice + this.state.taxes + this.state.packing}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/*address card*/}
                    <View style={styles.card}>
                        <Text style={{ color: Colors.accent, fontSize: 18, }}>Delivering To:</Text>
                        <Text style={styles.contentText}>{this.state.address}</Text>
                    </View>

                </ScrollView>
                <BottomBar onPressing={() => this.handlePayment()}>Confirm Order</BottomBar>
            </View>
        )
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
        flexDirection: "row",
        justifyContent: "space-between",
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
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    picker: {
        width: 90,
        color: 'white',
        height: 20,
    },
    contentText: {
        color: 'white',
        opacity: 0.7,
        fontSize: 16,
    }
})
