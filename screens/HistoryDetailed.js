import React from 'react'
import { Text, StyleSheet } from 'react-native'


export default class DetailedHistory extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Text>Detailed order of id: {this.props.navigation.state.params.orderid}</Text>
           )
    }
}