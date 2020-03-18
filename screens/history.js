import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
 
export default class Profile extends Component {

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
            )
    }

    state = {
        userid: null,
        history: []
    }

    render() {
    return (
      <View>
            <View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.state.history}
                    renderItem={order =>
                        <View key={order.id}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Details', {orderid: order.item.id})
                                }} >
                                <Text>id={order.item.id}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  
});