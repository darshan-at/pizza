import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen  from './screens/homeScreen'
import SauceSelection from './screens/sauceSelection'
import PizzaBaseSelection from './screens/pizzaBaseSelection'
import ToppingsSelection from './screens/toppingsSelection'
import ProfileScreen from './screens/profile'
import ReviewScreen from './screens/review'
import LoginScreen from './screens/loginScreen'
import SignupScreen from './screens/signup'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import ReviewOrderPizza from './screens/ReviewOrderPizza'
import OrderScreen from './screens/OrderScreen'
import HistoryScreen from './screens/history'
import EditScreen from './screens/EditScreen'
import DetailedHistory from './screens/HistoryDetailed'

export default class App extends React.Component {

  render() {
    return(
        <View style={styles.container} >
            <StatusBar hidden = {false}/>
            <AppContainer />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
})

const AppStack = createStackNavigator(
  {
        Home: {screen: HomeScreen,},
        PizzaBase: {screen: PizzaBaseSelection},
        SauceSelect: {screen: SauceSelection},
        ToppingsSelect: {screen: ToppingsSelection},
        ReviewOrder: {screen: ReviewScreen},
        Profile: { screen: ProfileScreen },
        EditProfile:{screen:EditScreen},
        ReviewOrderPizza: { screen: ReviewOrderPizza },
        Order: { screen: OrderScreen },
        History: { screen: HistoryScreen },
        Details: { screen: DetailedHistory }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#121212',
      },
      headerTintColor: '#fa9933',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AuthStack = createStackNavigator(
    {
        Login: { screen: LoginScreen, title: "Login" },
        Signup: { screen: SignupScreen, title: "Sign Up" },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#121212',
            },
            headerTintColor: '#fa9933',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
)

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: { screen: AuthLoadingScreen },
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);