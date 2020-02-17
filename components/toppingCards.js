import React from 'react'
import { View, 
        StyleSheet, 
        Text, 
        Image, 
        TouchableOpacity } from 'react-native'
import GLOBAL from '../constants/global'
export default function ToppingCards(props) {
    return(
        <TouchableOpacity
        onPress={()=>{props.onPressing()}} style={styles.mainContainer}>
                <Image style={styles.image} source={{uri: props.imgURL}} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.desc}</Text>
                    <Text style={styles.price}>{props.price}</Text>
                </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width:"100%",
        height:250,
        //paddingHorizontal:"2%",
        flex:1,
        flexDirection:"column",
    },
    image: {
        
       //position: 'absolute',
        height: 170,
        width: "100%",
        
    },
    textContainer: {
        position: 'relative',
     /*   top: 0,
        left: 10,
        right: 120,
       */
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