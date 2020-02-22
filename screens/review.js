import React from 'react'
import { StyleSheet, 
    View,
    AsyncStorage,
    ScrollView,
    Picker,
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
        AsyncStorage.getItem("base").then((value) => {
            value = JSON.parse(value)
            this.setState({ base: value })
            this.setState({ priceBaseOg: value.price })
        })
        AsyncStorage.getItem("sauce").then((value) => {
            value = JSON.parse(value)
            this.setState({ sauce: value })
        })
        AsyncStorage.getItem("toppings").then((value) => {
            value = JSON.parse(value)
            let totPrice = 0
            value.map((item) => {
                totPrice = totPrice + Number(item.price)
            })
            this.setState({ toppings: value, toppingsPrice: totPrice })
        })
        .done(() => {
                this.makeBill();
        })
    }

    makeBill = () => {
        let totalPrice = Number(this.state.base.price) + Number(this.state.sauce.price) + Number(this.state.toppingsPrice)
        totalPrice = Math.round(totalPrice * 100) / 100
        this.setState({ totalPrice: totalPrice })
        let Gst = Math.round(this.state.totalPrice * 0.12)
        Gst = Math.round(Gst * 100) / 100
        let packing = 20
        this.setState({ totalPrice: totalPrice, taxes: Gst })
    }

    handlePayment = () => {
        //give order here
    }

    state = {
        address: "lorem ipsum dolor sit amet",
        base: {},
        sauce: {},
        userid:null,
        toppings: [],
        priceBaseOg: null,
        toppingsPrice: null,
        totalPrice: null,
        taxes: null,
        slices: 4,
        size: '6',
        paymentOption: "cod",
    }

    updateSlices = (slice) => {
        this.setState({ slices: slice })
    }

    setBasePrice = () => {
        let basePrice = this.state.priceBaseOg * Number(this.state.size) / 6;
        basePrice = Math.round(basePrice * 100) / 100
        this.setState({ base: { ...this.state.base, price: basePrice } }, ()=>this.makeBill())
    }

    updateSize = (ItemValue) => {
        this.setState({size: ItemValue},()=>this.setBasePrice())
    }

    updatePayment = (itemValue) => {
        
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
                            {this.state.toppings
                                .map((item) => {
                                    return (<Topping key={Math.random()} topping={item} key={item.id} />)
                                })
                            }
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
                                onValueChange={(itemValue, itemIndex) => {this.updateSize(itemValue) }}>
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
                                    {this.state.totalPrice + this.state.taxes + 20}
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

class Topping extends React.Component {
    render() {
        return (
            <View style={styles.content}>
                <Text style={[styles.contentText, { paddingLeft: 10 }]}>
                    {this.props.topping.title}
                </Text>
                <Text style={{ color: 'white', opacity: 0.7, fontSize: 16, paddingRight: 10 }}>
                    {this.props.topping.price}
                </Text>
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
