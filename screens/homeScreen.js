import React from 'react'
import { View, 
        StyleSheet,
        FlatList} from 'react-native'
import { Icon } from 'react-native-elements'
import BottomBar from '../components/BottomBar'
import HomeScreenCards from '../components/homeScreenCards'
import ListContainer from '../components/listContainer'
import GLOBAL from '../constants/global'

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {  
        return {  
            title: "Home",  
            headerRight: (
                <Icon
                    style={{paddingRight: 10}}
                    name='person'
                    type='material'
                    color='#fa9933'
                    underlayColor='#121212'
                    onPress={()=>{
                        navigation.push("Profile");  
                    }}
                />
            )
        };
    };
    
    state = {
        pizzas: []
    }

    //get data from database
    componentDidMount() {
       fetch("https://unfixed-walls.000webhostapp.com/homeScreen.php")
       .then(response=>response.json())
       .then(data=>this.setState({pizzas: data}))
    }

    render() {
        return(
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
                            price={'Starting from '+pizza.item.price}
                            onPressing={()=>{
                                GLOBAL.pizza = pizza.item.id
                                this.props.navigation.push('ReviewOrder')
                            }}/>
                        }
                    />
                </ListContainer>
                <BottomBar onPressing={()=>{this.props.navigation.push('PizzaBase')}}>MAKE YOUR OWN PIZZA</BottomBar>
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