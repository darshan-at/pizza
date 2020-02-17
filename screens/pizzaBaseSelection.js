import React from 'react'
import { StyleSheet, 
        Text, 
        View,
        FlatList,
    ToastAndroid,
    AsyncStorage
} from 'react-native'
import BottomBar from '../components/BottomBar'
import ListContainer from '../components/listContainer'
import HomeScreenCards from '../components/homeScreenCards'

export default class PizzaBaseSelection extends React.Component {
    state = {
        pizzas: []
    }
    static navigationOptions= {
        title: "Select Pizza Base",
    }

    storeItem = async (pizza) => {
        try {
            await AsyncStorage.setItem("base", JSON.stringify(pizza))
            this.props.navigation.push('SauceSelect')
        } catch (e) {
            console.log(e)
        }
    }
    
    componentDidMount() {
        fetch("https://unfixed-walls.000webhostapp.com/pizzaMaking.php?table=crusts")
        .then(response=>response.json())
        .then(data=>this.setState({pizzas: data}))
    }

    render(){
        return (
            <View style={this.styles.container}>
                <ListContainer>
                    <FlatList 
                        keyExtractor={(item) => item.id}
                        data={this.state.pizzas}
                        style={this.styles.flatList}
                        renderItem={pizza =>
                            <HomeScreenCards
                                imgURL={pizza.item.image}
                                title={pizza.item.title}
                                desc={pizza.item.description}
                                id={pizza.item.id}
                                price={pizza.item.price + ' per inch'}
                                onPressing={() => {this.storeItem(pizza.item);}}
                                />
                        }
                    />
                </ListContainer>
                <BottomBar onPressing={()=>{ToastAndroid.show('Select a base!', ToastAndroid.SHORT)}}>
                    Next: Select Sauce</BottomBar>
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