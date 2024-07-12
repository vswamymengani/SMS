import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/BackArrow.png';

const LeaveApproval = ({ route }) => {
    const navigation = useNavigation();
    const email = route.params.email;
    const [leaveList, setLeaveList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchLeaveApproval = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/leaves?email=${email}`);
                // Reverse the array to show latest items first
                setLeaveList(response.data.reverse());
            } catch (err) {
                console.error(err);
                setErrors({ general: "Unable to load leaves" });
            }
        };
        if (email) {
            fetchLeaveApproval();
        } else {
            setErrors({ general: "Unable to get email" });
        }
    }, [email]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Format date as per your requirement
    };

    const renderItem = ({ item }) => (
        <View style={styles.leaves}>
            <Text style={styles.purpose}>Purpose: {item.leavePurpose}</Text>
            {item.created_at && (
                <Text style={styles.date}>Applied Date:{formatDate(item.created_at)}</Text>
            )}
            <Text style={styles.text}>Duration: {item.startDate} to {item.endDate}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
            <Text style={styles.button}>{item.approval !== null ? item.approval : 'Pending'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.header}>My Leaves</Text>
            </View>
            <FlatList
                data={leaveList}
                keyExtractor={(item) => item.id.toString()} // Assuming 'id' is unique for each item
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
            />
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
        margin: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    image: {
        height: 30,
        width: 30,
        marginEnd: '30%',
    },
    leaves: {
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
        alignItems: 'center',
        padding: 20,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    purpose: {
        alignItems: 'center',
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
        alignItems: 'center',
        width: '30%',
        color: "white",
        backgroundColor: "red",
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        textAlign: 'center',
    },
    flatListContainer: {
        paddingVertical: 10,
    },
});

export default LeaveApproval;
