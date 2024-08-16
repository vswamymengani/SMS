import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const TeacherHomeWorkList = ({ route }) => {
    const email = route.params.email;
    const navigation = useNavigation();
    const [homeworkList, setHomeworkList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchHomeworkData = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/teacherHomeworkList?email=${email}`);
                setHomeworkList(response.data.reverse());
            } catch (error) {
                console.error("axios error",error);
            }
        };
        if (email) {
            fetchHomeworkData();
        }
    }, [email]);

    return (
        <View style={styles.container}>
            <Image source={Image2} style={styles.bc} />
            <View style={styles.head}>
                <TouchableOpacity onPress={() =>navigation.navigate('TeacherHomework',{ email})} >
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.header}>Homework List</Text>
            </View>
            <ScrollView style={styles.body}>
                {homeworkList.map((homework) => (
                    <View key={homework.id} style={styles.homeworkContainer}>
                        <Text style={styles.text}>Class: {homework.className} Section: {homework.section}</Text>
                        <Text style={styles.text1}>Type of Homework: {homework.typeOfHomework}</Text>
                        <Text style={styles.text1}>Title: {homework.title}</Text>
                        <Text style={styles.text1}>Duration: {homework.duration}</Text>
                        <Text style={styles.text1}>Homework: {homework.homework}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bc:{
        height:'110%',
        width:'110%',
        position:'absolute',
      },
      head:{
        flexDirection:'row',
        justifyContent:'flex-start',
        top:20,
        marginBottom:80,
      },
      image:{
        height:23,
        width:18,
        marginHorizontal:10
      },
      header:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
      },
      body:{
        borderRadius:30,
        backgroundColor:'white',
        height:'110%',
      },
    homeworkContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        borderRadius: 20,
        paddingVertical:10,
        paddingHorizontal:60,
        borderColor: 'black',
        backgroundColor:'white',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'blue',
    },
    text1: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
});

export default TeacherHomeWorkList;
