import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'
import { Dropdown } from 'react-native-material-dropdown'

export default class ReviewCard extends React.Component {
    render() {

        let cuts = [
            { value: '4', },
            { value: '6', },
            { value: '8', },
            { value: '10', },
            { value: '12', },
        ];

        let sizes = [
            { value: '6"', },
            { value: '8"', },
            { value: '10"', },
            { value: '12"', },
            { value: '15"', },
            { value: '17"', },
            { value: '20"', },
        ];

        return (
            <View style={styles.card}>
                <Text style={styles.mainTitle}>{this.props.title}</Text>
                <Text style={styles.title}>Base:</Text>
                <View style={styles.component}>
                    <Text style={styles.content}>{this.props.attributes.base.title}</Text>
                    <Text style={styles.content}>{this.props.attributes.base.price}</Text>
                </View>
                <Text style={styles.title}>Sauce:</Text>
                <View style={styles.component}>
                    <Text style={styles.content}>{this.props.attributes.sauce.title}</Text>
                    <Text style={styles.content}>{this.props.attributes.sauce.price}</Text>
                </View>
                <Text style={styles.title}>Toppings:</Text>
                <View style={styles.component}>
                    <Text style={styles.content}>{this.props.attributes.base.title}</Text>
                    <Text style={styles.content}>{this.props.attributes.base.price}</Text>
                </View>
                <View style={styles.component}>
                    <Dropdown
                        style={styles.dropdown}
                        label='Cuts'
                        data={cuts}
                    />
                </View>
                <View style={styles.component}>
                    <Text style={styles.title}>Size:</Text>
                    <Text style={styles.content}>{this.props.attributes.base.price}</Text>
                </View>
                <View style={styles.component}>
                    <Text style={styles.title}>Total:</Text>
                    <Text style={styles.content}>{this.props.attributes.base.price}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
    //    borderBottomColor: "#aaaaaa",
  //      borderRightColor: "#aaaaaa",
//        borderBottomRightRadius: 10,
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        opacity: 0.9,
    },
    mainTitle: {
        fontSize: 22,
        color: Colors.accent,
    },
    content: {
        color: "#ffffff",
        opacity: 0.7,
        fontSize: 16,
    },
    component: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 10,
    }
})