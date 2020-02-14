import React from 'react'
import { View, 
        StyleSheet, 
        Text, 
        Image, 
        TouchableOpacity } from 'react-native'

export default function HomeScreenCards(props) {
    return(
        <TouchableOpacity  
        onPress={()=>{props.onPressing()}}>
            <View style={styles.mainContainer}>
                <Image style={styles.image} source={{uri: props.imgURL}} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.desc}</Text>
                    <Text style={styles.price}>{props.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    image: {
        position: 'absolute',
        right: 0,
        height: 100,
        width: 100,
    },
    textContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 120,
    },
    title: {
        color: '#ffffff',
        opacity: 0.8,
        fontSize: 20,
        fontStyle: 'italic',
    },
    description: {
        color: '#ffffff',
        opacity: 0.6,
    },
    price: {
        color: '#ffffff',
        opacity: 0.6,
        fontStyle: 'italic',
    },
})