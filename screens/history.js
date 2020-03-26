import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, TouchableOpacity, FlatList, Modal } from 'react-native';
import colors from '../constants/colors';
import {
    MaterialIndicator,
} from 'react-native-indicators';
export default class History extends Component {

    static navigationOptions = {
        title: "History"
    }

    componentDidMount() {
        let query = "https://unfixed-walls.000webhostapp.com/historyList.php?userid="
        AsyncStorage.getItem('userToken')
            .then((data) => this.setState({ userid: data }))
            .then(() => fetch(query + this.state.userid)
                .then((response) => response.json())
                .then((val) => this.setState({ history: val }))
                .then(() => { this.setState({ loading: false }) })


            )


    }

    state = {
        userid: null,
        history: [],
        loading: true,
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View >

                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={this.state.history}
                        renderItem={order =>
                            <View
                                key={order.id}
                                style={styles.item}>

                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => {
                                        this.props.navigation.navigate('Details', { orderid: order.item.id })
                                    }}>
                                    <View style={styles.cardTitle}>
                                        <Text style={{ alignSelf: "center", fontSize: 18, color: colors.accent }}>Order Id:{order.item.id}</Text>
                                        <Text style={{ position: "absolute", right: 2, alignSelf: "center", fontSize: 16, color: colors.accent }}>Date:{order.item.date}</Text>
                                    </View>


                                    <Text style={styles.text}>Items</Text>

                                    {order.item.pizzaName != " " && <Text style={styles.list}>Pizza:{order.item.pizzaName}</Text>}
                                    {order.item.baseName != " " && <Text style={styles.list}>Base:{order.item.baseName}</Text>}
                                    {order.item.sauceName != " " && <Text style={styles.list}>Sauce:{order.item.sauceName}</Text>}
                                    {order.item.toppingName != " " && <Text style={styles.list}>Toppings:{order.item.toppings}</Text>}
                                    <View style={styles.cardFooter}>
                                        <Text style={{ alignSelf: "center", fontSize: 18, color: colors.accent }}>Total</Text>
                                        <Text style={{ position: "absolute", right: 2, alignSelf: "center", fontSize: 16, color: colors.accent }}>{order.item.total}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                </View>
                {
                    this.state.loading &&
                    <Modal visible={this.state.loading}
                        transparent={true}
                        style={{ zindex: 1 }}
                    >
                        <View style={styles.loading}>
                            <MaterialIndicator size={60} animating={this.state.loading} color="white" />
                        </View>
                    </Modal>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,

    },
    item: {
        backgroundColor: colors.primary,
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        height: "auto",
        paddingBottom: "10%",

    },
    card: {
        backgroundColor: colors.accent,
        width: "90%",

        height: "auto",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.accent,
    },
    cardTitle: {

        flexGrow: 1,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: colors.accent,
        backgroundColor: colors.primary,
        paddingLeft: "1%",
    },
    cardFooter: {
        flexDirection: "row",
        flexGrow: 1,
        borderWidth: 2,
        borderBottomColor: colors.accent,
        backgroundColor: colors.primary,
    },
    text: {
        color: colors.primary,
        fontSize: 20,
        paddingLeft: "1%",
    },
    list: {
        color: colors.primary,
        fontSize: 15,
        paddingLeft: "5%",
        fontWeight:"800",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.primary,
        opacity: 0.5
    }
});