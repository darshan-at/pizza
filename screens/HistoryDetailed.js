import React from 'react'
import { Text, StyleSheet, View, ToastAndroid } from 'react-native'
import Color from '../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default class DetailedHistory extends React.Component {

	static navigationOptions = {
		title: "History",
	}

	state = {

	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let query = "https://unfixed-walls.000webhostapp.com/historyDetail.php?orderid="
			+ this.props.navigation.state.params.orderid
		fetch(query)
			.then((response) => response.json())
			.then((val)=>this.setState(val))
			.then(()=>console.log(this.state))
	}

	handleRepeat = () =>{
		let query = "https://unfixed-walls.000webhostapp.com/repeatOrder.php?tid="+this.state.tid
		fetch(query)
            .then((val) => { ToastAndroid.show('Successfully Ordered', ToastAndroid.SHORT); })
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => { ToastAndroid.show('Failed to place order', ToastAndroid.SHORT) })
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<View style={styles.methodStatus}>
					<Text style={styles.nameText}>Order Date/Time</Text>
					<Text style={styles.nameText}>{this.state.time}</Text>
				</View>
				{
					this.state.pizzaName ?
						(<View>
							<Text style={styles.header}>CONTENTS</Text>
							<Detail name={this.state.pizzaName} name2={this.state.total} />
							<Detail name="Slices" name2={this.state.slices} />
							<Detail name="Size" name2={this.state.size} />
							<Text style={styles.header}>DETAILED BILL</Text>
							<Bill state={this.state} />	
						</View>) :
						(<View>
							<Text style={styles.header}>CONTENTS</Text>
							<Detail name={this.state.baseName} name2={this.state.basePrice} />
							<Detail name={this.state.sauceName} name2={this.state.saucePrice} />
							<Detail name={this.state.toppings} name2={this.state.toppingsPrice} />
							<Detail name="Slices" name2={this.state.slices} />
							<Detail name="Size" name2={this.state.size} />
							<Text style={styles.header}>DETAILED BILL</Text>
							<Bill state={this.state} />	
						</View>)
				}
				{/* <TouchableOpacity style={styles.repeatButton} onPress={()=>{this.handleRepeat()}}>
					<Text style={{fontSize: 20, fontWeight: "100"}}>Repeat Order</Text>
				</TouchableOpacity> */}
			</View>
		);

	}
}

class Detail extends React.Component {
	render() {
		return (
			<View style={styles.detailContainer}>
				<View style={styles.name1}>
					<Text style={styles.nameText}>{this.props.name}</Text>
				</View>
				<View style={styles.name2}>
					<Text style={styles.nameText}>{this.props.name2}</Text>
				</View>
			</View>
			)
	}
}

class Bill extends React.Component {

	render(){
		return(
			<View>
				<Detail name="Order Total" name2={this.props.state.total} />
				<Detail name="Taxes" name2={this.props.state.taxes} />
				<Detail name="Packing and Delivery" name2={this.props.state.packing} />
				<Detail name="Grand Total" 
				name2={Number(this.props.state.total)+Number(this.props.state.packing)+Number(this.props.state.taxes)} />


				<Text style={styles.header}>Delivery Details</Text>
				<View style={styles.methodStatus}>
					<Text style={styles.nameText}>Payment Method</Text>
					<Text style={styles.nameText}>Cash on Delivery</Text>
				</View>
				<View style={styles.methodStatus}>
					<Text style={styles.nameText}>Status</Text>
					<Text style={styles.nameText}>{this.props.state.status}</Text>
				</View>
				{this.props.state.rejectionMessage?
				(<View style={styles.methodStatus}>
					<Text style={styles.nameText}>Rejection Message</Text>
					<Text style={styles.nameText}>{this.props.state.rejectionMessage}</Text>
				</View>):
				(<View></View>)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		paddingHorizontal: 10,
		backgroundColor: 'black',
		flex: 1,
	},
	detailContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		minWidth: 0,
	},
	name1: {
		flex: 7,
	},
	name2: {
		flex: 1,
	},
	header: {
		color: Color.accent,
		fontSize: 20,
	},
	nameText: {
		fontSize: 16,
		color: 'white',
		opacity: 0.8,
	},
	methodStatus: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	repeatButton: {
		marginTop: 30,
		height: 30,
		justifyContent: "center",
		borderRadius: 7,
		width: '95%',
		alignSelf: "center",
		alignItems: "center",
		color: Color.primary,
		backgroundColor: Color.accent,
	},
})