import React from 'react'
import { StyleSheet, 
        Text, 
    View,
} from 'react-native'
import GLOBAL from '../constants/global'

export default class ReviewScreen extends React.Component {
        state = GLOBAL
        componentDidMount() {
            console.log("Base id" + this.state.baseid)
        if (this.state.pizza != null) {
            
        } else {

        }
    }

    render(){
        return (
            <View style={this.styles.container}>
                <Text>{this.state.pizza}</Text>
                <Text></Text>
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