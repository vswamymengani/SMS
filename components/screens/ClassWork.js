import React, { useState } from "react";
import { View,Text,Image,ScrollView,StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ClassWork =({route}) =>{
    const navigation = useNavigation();
    const [teacherprofile ,useTeacherprofile] = useState({});
    const [error, setError] = useState(null);
    const {email} = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.work}>Work is in progress</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('TeacherHomeScreen',{ email })}>
                <Text style={styles.goback}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'white',
    },
    work:{
        fontSize:30,
        borderWidth:2,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent:'center',
        color:'white',
        textAlign:'center',
        height:60,
        width:-36,

    },
    goback:{
        textAlign:'center',
        fontSize:20,
        top:30,
        color:'black',

    }
})

export default ClassWork;