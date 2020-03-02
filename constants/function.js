import global from './global';
import {AsyncStorage} from 'react-native';

export const retrieveData=async()=>{
    try{
        AsyncStorage.getItem("userToken")
        .then((data)=>{global.userid=data})
       
       AsyncStorage.getItem("fname")
       .then((data)=>{global.fname=data})

       AsyncStorage.getItem("pass")
       .then((data)=>{global.password=data})
       
       AsyncStorage.getItem("lname")
       .then((data)=>{global.lname=data})
      
      AsyncStorage.getItem("address")
      .then((data)=>{global.address=data})
     
     AsyncStorage.getItem("mobile")
     .then((data)=>{global.mobile=data})
     AsyncStorage.getItem("email")
        .then((data)=>{global.email=data})
    }
    catch(e){
        console.log(e)
    }
}