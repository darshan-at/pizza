import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native'
import BottomBar from '../components/BottomBar'
import ListContainer from '../components/listContainer'
import global from '../constants/global'
import ToppingCards from '../components/toppingCards'

export default class ToppingsSelection extends React.Component {
    state = {
        pizzas: [],
        numColumns: 2,
        selectedTopping: [],

    }
    static navigationOptions = {
        title: "Select Toppings",
    }

    componentDidMount() {
        fetch("https://unfixed-walls.000webhostapp.com/pizzaMaking.php?table=toppings")
            .then(response => response.json())
            .then(data => {
                data = data.map(item => {
                    item.isSelect = false;
                    item.selectedClass = this.styles.mainContainer;
                    return item;
                })
                this.setState({ pizzas: data })
            }).catch(error => console.log("ERRRRRRR" + error));
    }
    render() {
        return (
            <View style={this.styles.container}>
                <ListContainer>
                    <FlatList
                        numColumns={this.state.numColumns}
                        keyExtractor={(item) => item.id}
                        data={this.state.pizzas}
                        style={this.styles.flatList}
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
                                        /*global.toppings = global.toppings + " " + pizza.item.title
                                        const toppings = global.toppings.split(" ")
                                        toppings.splice(toppings.indexOf(""), 1)
                                        global.toppingsId = global.toppingsId + " " + pizza.item.id
                                        const toppingsId = global.toppingsId.split(" ")
                                        toppingsId.splice(toppingsId.indexOf(""), 1)
                                        *///this.props.navigation.push('ReviewScreen')
                                        //global.toppings.toppingsId=[global.toppings.toppingsId,pizza.item.id]
                                        if (pizza.item.isSelect == false) {
                                            const a = {
                                                key: pizza.item.id,
                                                isSelect: !pizza.item.isSelect,
                                                title: pizza.item.title,
                                                price: pizza.item.price
                                            }
                                            this.setState({
                                                selectedTopping: [...this.state.selectedTopping, a]
                                            });
                                            
                                        }
                                        /*else
                                        {
                                                let t=this.state.selectedTopping.filter(
                                                ele=>
                                                {
                                                    if(ele.id==pizza.item.id)
                                                }
                                            )
                                        }*/
                                        pizza.item.isSelect = !pizza.item.isSelect
                                        pizza.item.selectedClass = pizza.item.isSelect ? this.styles.selected : this.styles.mainContainer
                                        this.setState(this.state.pizzas)
                                        //this.selectTopping(pizza)
                                    }} />
                            </View>
                        }
                    />
                </ListContainer>
                <BottomBar onPressing={() => this.props.navigation.push('ReviewOrder')}>Next: Review Order</BottomBar>
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
            marginBottom: 60,
            paddingHorizontal: 10,

        },
        selected: {
            backgroundColor: "#f9aa33",
            marginBottom: 60,
            paddingHorizontal: 10,

        },
    })
}