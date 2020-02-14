import React from 'react'
import { StyleSheet, 
        Text, 
        View,
        FlatList,
        ToastAndroid } from 'react-native'
import Header from '../components/Header'
import BottomBar from '../components/BottomBar'
import ListContainer from '../components/listContainer'
import HomeScreenCards from '../components/homeScreenCards'

export default class SauceSelection extends React.Component {
    state = {
        pizzas: []
    }
    static navigationOptions= {
        title: "Select Sauce",
    }
    
    componentDidMount() {
        fetch("https://unfixed-walls.000webhostapp.com/pizzaMaking.php?table=sauces")
        .then(response=>response.json())
        .then(data=>this.setState({pizzas: data}))
    }

    render(){
        return (
            <View style={this.styles.container}>
                <ListContainer>
                    <FlatList 
                        keyExtractor = {(item)=>item.id}
                        data = {this.state.pizzas}
                        style= {this.styles.flatList}
                        renderItem = {pizza=>
                            <HomeScreenCards 
                            imgURL={pizza.item.image} 
                            title={pizza.item.title} 
                            desc={pizza.item.description}
                            id={pizza.item.id}
                            price={'$'+pizza.item.price}
                            onPressing={()=>{
                                GLOBAL.sauce = pizza.item.id
                                GLOBAL.sauceName = pizza.item.title
                                this.props.navigation.push('ToppingsSelect')}}/>
                        }
                    />
                </ListContainer>
                <BottomBar onPressing={()=>{ToastAndroid.show('Select a sauce!', ToastAndroid.SHORT)}}>
                    Next: Select Toppings</BottomBar>
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