import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function ListContainer(props) {
    return(
        <View style={styles.listStyle}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        height: '91%',
        left: 0,
    },
})