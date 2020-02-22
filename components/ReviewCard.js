import { View, Text, StyleSheet, ScrollView, Picker } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'

export default class ReviewCard extends React.Component {

    state = {
        address: 'address, lorem ipsum dolor sit amet',
        size: null,
        slices: null,
        baseAmount: 3,
        totalPrice: null,
    }

    

    componentDidMount() {
        let basePrice = Number(this.props.attributes.base.price * 1)
        this.setState({ baseAmount: basePrice })
        console.log(this.state.baseAmount)
        //fetch address here
    }

    render() {
        let saucePrice = Number(this.props.attributes.sauce.price)
        let totalPrice = this.state.baseAmount + saucePrice + toppingPrice;
        
        //this.setState({ totalPrice: totalTaxPrice })

        

        return (
            
        )
    }
}



const styles = StyleSheet.create({
})