import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from '../constants/colors'

export default function BackIcon() {
    return(
        <View style={styles.icon} >
            <Icon 
                name='arrow-back'
                color={Colors.primary}
                type='material'
                size={27}
                reverse
                onPress={()=>{console.log('Back button pressed')}} />
        </View>
    )
} 
const styles = StyleSheet.create({
    icon: {
    },
})