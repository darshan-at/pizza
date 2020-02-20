import React from 'react'
import {
    StyleSheet,
    Text,
    Button,
    View,
    AsyncStorage,
} from 'react-native'
import Colors from '../constants/colors'
import ReviewCardPizza from '../components/ReviewCardPizza'
import BottomBar from '../components/BottomBar'


export default class ReviewScreen extends React.Component {

    static navigationOptions = {
        title: "Review"
    }

    state = {
        pizza: {}
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        AsyncStorage.getItem("pizza").then((value) => {
            value = JSON.parse(value)
            this.setState({ pizza: value })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ReviewCardPizza title="Item1" attributes={this.state} />
                <BottomBar onPressing={() => console.log('payment')}>Next: Payment</BottomBar>
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
    }
})