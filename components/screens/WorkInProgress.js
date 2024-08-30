import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Image1 from '../assets/BackArrow.png';

const WorkInProgress =({route}) =>{
    const {email} = route.params;
    const navigation = useNavigation();

    return(
        <View style = {styles.container}>
            <Text style= {styles.text}>Work in Progress</Text>
            <TouchableOpacity onPress={() =>navigation.navigate('Homescreen',{ email })}>
                <Text style = {styles.button}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:30,
        color:'white',
        width:'50%',
        textAlign:'center',
        margin:20,
        borderRadius:10,
        borderWidth:2,
        backgroundColor:'#3F1175',
    },
    button:{
        fontSize:20,
        color:'white',
        width:'30%',
        textAlign:'center',
        margin:10,
        borderRadius:10,
        backgroundColor:'#3F1175',
    }
});

export default WorkInProgress;