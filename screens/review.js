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
        //fetch address here
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
        .done(() => {
                this.makeBill();
        })
        /*AsyncStorage.getItem("toppings").then((value) => {
            value = JSON.parse(value)
            this.setState({ toppings: value })
        })*/
    }

    makeBill = () => {
        let toppingPrice = 0
        this.state.toppings.map((item) => { toppingPrice = toppingPrice + Number(item.price) })
        this.setState({ toppingsPrice: toppingPrice })
        let totalPrice = Number(this.state.base.price) + Number(this.state.sauce.price) + this.state.toppingsPrice
        this.setState({ totalPrice: totalPrice })
        let Gst = Math.round(this.state.totalPrice * 0.12)
        let packing = 20
        let taxes = Gst;
        this.setState({ totalPrice: totalPrice, taxes: taxes })
    }

    handlePayment = () => { 
    }

    state = {
        address: "lorem ipsum dolor sit amet",
        base: {},
        sauce: {},
        userid:null,
        toppings: [
            {
                "id": 1,
                "title": "onion",
                "price": 4
            },
            {
                "id": 5,
                "title": "pepperoni",
                "price": 2
            },
            {
                "id": 4,
                "title": "tomato",
                "price": 10
            },
        ],
        priceBaseOg: null,
        toppingsPrice: null,
        totalPrice: null,
        taxes: null,
        slices: 4,
        size: '6',
    }

    updateSlices = (slice) => {
        this.setState({ slices: slice })
        console.log("Slices" + this.state.slices)
    }

    setBasePrice = () => {
        let basePrice = this.state.priceBaseOg * Number(this.state.size) / 6;
        basePrice = Math.round(basePrice * 100) / 100
        this.setState({ base: { ...this.state.base, price: basePrice } }, ()=>this.makeBill())
    }

    updateSize = (ItemValue) => {
        this.setState({size: ItemValue},()=>this.setBasePrice())
    }

    render() {

        let cuts = ["4", "6", "8", "10", "12"];
        let sizes = ['6', '8', '10', '12', '15', '17', '20'];

        return (
            <View style={styles.container}>
                <ScrollView style={styles.Container}>

                    {/*address card*/}
                    <View style={styles.card}>
                        <Text style={{ color: Colors.accent, fontSize: 18, }}>Delivering To:</Text>
                        <Text style={styles.contentText}>{this.state.address}</Text>
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
                                    return (<Topping key={item.id} topping={item} key={item.id} />)
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
                                        return (<Picker.Item key={item.index} label={item} value={item} />
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
                                        return (<Picker.Item key={item.id} label={item} value={item} />
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
