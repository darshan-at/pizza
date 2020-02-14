import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'
export default function BottomBar(props) {
    return(
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={props.onPressing}
            style={styles.textContainer}>
                <Text style={styles.textStyle}>{props.children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '9%',
        backgroundColor: Colors.primary,
        left: 0,
        bottom: 0,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: Colors.accent,
        fontStyle: 'normal',
        fontSize: 26,
        textAlign: 'center',
        letterSpacing: 0.177778,
    },
})
