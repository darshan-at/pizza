import React from 'react'
import { StyleSheet, 
        Text, 
        View,
        FlatList } from 'react-native'
import BottomBar from '../components/BottomBar'
import ListContainer from '../components/listContainer'
import HomeScreenCards from '../components/homeScreenCards'

export default class ToppingsSelection extends React.Component {
    state = {
        pizzas: []
    }
    static navigationOptions= {
        title: "Select Toppings",
    }
    
    componentDidMount() {
        fetch("https://unfixed-walls.000webhostapp.com/pizzaMaking.php?table=crusts")
        .then(response=>response.json())
        .then(data=>this.setState({pizzas: data}))
    }

    render(){
        return (
            <View style={this.styles.container}>
                <Text>Toppings</Text>
                <BottomBar onPressing={()=>this.props.navigation.push('ReviewOrder')}>Next: Review Order</BottomBar>
            </View>
        )
    }

    styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
    })
}