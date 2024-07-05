import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/BackArrow.png';

const TeacherLeaveApproval = ({ route }) => {
    const email = route?.params?.email;
    const navigation = useNavigation();
    const [leaveList, setLeaveList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (email) {
            const fetchLeaveApproval = async () => {
                try {
                    const response = await axios.get(`http://10.0.2.2:3000/teacherLeaveList?email=${email}`);
                    setLeaveList(response.data);
                } catch (error) {
                    console.error(error); // Log the error for debugging
                    setErrors({ general: "Error while fetching data" });
                }
            };
            fetchLeaveApproval();
        } else {
            setErrors({ general: "Email is missing" });
        }
    }, [email]);

    const renderItem = ({ item }) => (
        <View style={styles.leaves}>
            <Text style={styles.purpose}>Purpose: {item.purpose}</Text>
            <Text style={styles.text}>Duration: {item.startdate} To {item.enddate}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
            <Text style={styles.button}>{item.approval !== null ? item.approval : 'Pending'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.header}>My Leaves</Text>
            </View>
            {errors.general ? (
                <Text style={styles.errorText}>{errors.general}</Text>
            ) : (
                <FlatList
                    data={leaveList}
                    keyExtractor={(item) => item.id.toString()} // Assuming 'id' is unique for each item
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                    ListEmptyComponent={<Text style={styles.emptyText}>No leaves found</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        paddingBottom: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    image: {
        height: 30,
        width: 30,
    },
    leaves: {
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
        alignItems: 'center',
        padding: 20,
    },
    purpose: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    text: {
        fontSize: 15,
        color: 'black',
        margin: 5,
    },
    button: {
        width: '30%',
        color: "white",
        backgroundColor: "red",
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 15,
        padding: 5,
        textAlign: 'center',
    },
    flatListContainer: {
        paddingVertical: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
});

export default TeacherLeaveApproval;
