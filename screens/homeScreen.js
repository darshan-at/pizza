import React from 'react'
import { View, 
        StyleSheet,
        FlatList,
        AsyncStorage,
        RefreshControl} from 'react-native'
import { Icon } from 'react-native-elements'
import BottomBar from '../components/BottomBar'
import HomeScreenCards from '../components/homeScreenCards'
import ListContainer from '../components/listContainer'
import colors from '../constants/colors'

export default class HomeScreen extends React.Component {
    constructor() {
        super();    
        this.state = {
            pizzas: [],
            isRefreshing: false,
        }
        this._onRefresh = this._onRefresh.bind(this)
    }

    static navigationOptions = ({ navigation }) => {  
        return {  
            title: "Home",  
            headerRight: (
                <Icon
                    containerStyle={{paddingRight: 10}}
                    name='person'
                    type='material'
                    color={colors.accent}
                    underlayColor={colors.primary}
                    onPress={()=>{
                        navigation.push("Profile");  
                    }}
                />
            )
        };
    };

    storeItem = async (pizza) => {
        try {
            await AsyncStorage.setItem("pizza", JSON.stringify(pizza))
            this.props.navigation.push('ReviewOrderPizza')
        } catch (e) {
            console.log(e)
        }
    }
    getData(){
        fetch("https://unfixed-walls.000webhostapp.com/homeScreen.php")
       .then(response=>response.json())
       .then(data=>this.setState({pizzas: data, isRefreshing: false}))
    }
    //get data from database
    componentDidMount() {
        this.getData();
    }
    _onRefresh() {
        this.setState({isRefreshing: true}, this.getData)
    }
    render() {
        return(
            <View style={this.styles.container}>
                <ListContainer>
                    <FlatList 
                        refreshControl={
                            <RefreshControl 
                             refreshing={this.state.isRefreshing}
                             onRefresh={this._onRefresh}
                            />
                        }
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
                                this.storeItem(pizza.item);
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