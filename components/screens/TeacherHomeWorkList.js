import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/BackArrow.png';

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
            <ScrollView>
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
        alignItems:'center',
        top:10,
        backgroundColor:'#3F1175',
    },
    homeworkContainer: {
        borderWidth: 1,
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
