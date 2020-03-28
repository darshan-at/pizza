import React from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    AsyncStorage,
    RefreshControl
} from 'react-native'
import BottomBar from '../components/BottomBar'
import ListContainer from '../components/listContainer'
import ToppingCards from '../components/toppingCards'

export default class ToppingsSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            isRefreshing: false,
            pizzas: [],
            numColumns: 2,
            selectedTopping: [],
    
        }
        this._onRefresh = this._onRefresh.bind(this);
    }
    static navigationOptions = {
        title: "Select Toppings",
    }
    getData() {
        fetch("https://unfixed-walls.000webhostapp.com/pizzaMaking.php?table=toppings")
            .then(response => response.json())
            .then(data => {
                data = data.map(item => {
                    item.isSelect = false;                                      //adds the by default select state to each
                    item.selectedClass = this.styles.mainContainer;             //item and default class 
                    return item;
                })
                this.setState({ pizzas: data, isRefreshing: false})
            })
    }
    _onRefresh() {
        this.setState({isRefreshing: true}, this.getData());
    }
    storeItem = async () => {
        try {
            await AsyncStorage.setItem("toppings", JSON.stringify(this.state.selectedTopping))    
            this.props.navigation.push('ReviewOrder')
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <View style={this.styles.container}>
                <ListContainer>
                    <FlatList
                        refreshControl = {
                            <RefreshControl 
                                refreshing = {this.state.isRefreshing}
                                onRefresh = {this._onRefresh}
                            />
                        }
                        numColumns={this.state.numColumns}
                        keyExtractor={(item) => item.id}
                        data={this.state.pizzas}
                        renderItem={pizza =>
                            <View
                                style={pizza.item.selectedClass}>
                                <ToppingCards
                                    imgURL={pizza.item.image}
                                    title={pizza.item.title}
                                    desc={pizza.item.description}
                                    id={pizza.item.id}
                                    price={'Topping price ' + pizza.item.price}
                                    onPressing={() => {
                                        //add the inactive topping state to array selectdToppings[]
                                        if (pizza.item.isSelect == false) {
                                            const a =
                                            {
                                                id: pizza.item.id,
                                                title: pizza.item.title,
                                                price: pizza.item.price,
                                                isSelect: !pizza.item.isSelect,
                                            }
                                            this.setState({
                                                selectedTopping: [...this.state.selectedTopping, a]
                                            });
                                        }
                                        else {
                                            //deletes the topping from selectedToppings[] 
                                            //when user diselects the topping item
                                            let t = this.state.selectedTopping.filter(
                                                ele => {
                                                    if (ele.id !== pizza.item.id) {
                                                        return ele
                                                    }
                                                })
                                            this.setState({ selectedTopping: t })
                                        }
                                        //change the style of active topping class to inactive and vice versa 
                                        pizza.item.isSelect = !pizza.item.isSelect
                                        pizza.item.selectedClass = pizza.item.isSelect ? this.styles.selected : this.styles.mainContainer
                                        this.setState(this.state.pizzas)
                                    }} />
                            </View>
                        }
                    />
                </ListContainer>
                <BottomBar onPressing={() => {
                    //Assign GLOBAL TOPPINGS as selected toppings
                    this.storeItem();

                }}>
                    Next: Review Order</BottomBar>
            </View>
        )
    }

    styles = StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        mainContainer: {
            height: "100%",
            marginBottom: "10%",
            flex: 1,
            flexDirection: "column",
            paddingHorizontal: "1%",
        },
        selected: {
            backgroundColor: "#f9aa33",
            marginBottom: "10%",
            paddingHorizontal: "1%",
            flex: 1,
            flexDirection: "column",
            borderWidth: 1,
            borderRadius: 10,
        },
    })
}