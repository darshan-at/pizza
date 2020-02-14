import React from 'react'
import { StyleSheet,
        Text,
        View, 
        } from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from '../constants/colors'
import BackIcon from '../constants/backIcon'


function Header(props) {

    console.log(this.props.navigation)

    let leftIcon;
    if(props.leftIcon==='bars'){
        console.log('bars')
        leftIcon =<Icon 
            name='menu'
            color={Colors.primary}
            type='material'
            size={27}
            reverse
            onPress={props.onPressing()} />
    }else{
        leftIcon = <Icon 
        name='arrow-back'
        color={Colors.primary}
        type='material'
        size={27}
        reverse
        onPress={props.onPressing()} />
    }

    return(
        <View style={styles.container}>
            <View style={styles.icon}>{leftIcon}</View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{props.children}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '9%',
        backgroundColor: Colors.primary,
        top: 0,
        left: 0,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    headerText: {
        color: Colors.accent,
        fontStyle: 'normal',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.177778,
    },
    icon: {
        position: 'absolute',
        left: 10,
        color: '#ffffff'
    },
})

export default Header