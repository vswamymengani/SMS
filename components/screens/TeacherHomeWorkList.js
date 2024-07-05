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
                setErrors({ general: "Unable to get data" });
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
                        <Text style={styles.text}>Class: {homework.classname} Section: {homework.section}</Text>
                        <Text>Type of Homework: {homework.typeOfHomework}</Text>
                        <Text>Title: {homework.title}</Text>
                        <Text>Duration: {homework.duration}</Text>
                        <Text>Homework: {homework.homework}</Text>
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
    },
    homeworkContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 20,
        paddingHorizontal:70,
        paddingTop:10,
        borderColor: 'black',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
});

export default TeacherHomeWorkList;
