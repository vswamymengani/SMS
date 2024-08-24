import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const LeaveApproval = ({ route }) => {
    const navigation = useNavigation();
    const email = route.params.email;
    const [leaveList, setLeaveList] = useState([]);
    const [filteredLeaveList, setFilteredLeaveList] = useState([]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Pending', value: null },
    ];

    useEffect(() => {
        const fetchLeaveApproval = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/studentLeaveList?email=${email}`);
                const reversedData = response.data.reverse();
                setLeaveList(reversedData);
                setFilteredLeaveList(reversedData);
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

    useEffect(() => {
        if (status === 'all') {
            setFilteredLeaveList(leaveList);
        } else {
            const filteredData = leaveList.filter(item => item.approval === status);
            setFilteredLeaveList(filteredData);
        }
    }, [status, leaveList]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Format date as per your requirement
    };

    const renderItem = ({ item }) => (
        <View style={styles.leaves}>
            <Text style={styles.purpose}>Purpose: {item.leavePurpose}</Text>
            {item.created_at && (
                <Text style={styles.date}>Applied Date: {formatDate(item.created_at)}</Text>
            )}
            <Text style={styles.text}>Duration: {item.startDate} to {item.endDate}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
            <Text style={styles.button}>{item.approval !== null ? item.approval : 'Pending'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={Image2} style={styles.bc} />
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate('StudentLeave',{email})}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.header}>My Leaves</Text>
            </View>
            <View style={styles.body}>
                <Dropdown
                    style={styles.dropdown}
                    data={statusOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select status"
                    value={status}
                    onChange={item => setStatus(item.value)}
                />
                <FlatList
                    data={filteredLeaveList}
                    keyExtractor={(item) => item.id.toString()} // Assuming 'id' is unique for each item
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bc: {
        height: '110%',
        width: '110%',
        position: 'absolute',
    },
    body: {
        backgroundColor: 'white',
        height: '110%',
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 20,
        marginBottom:40,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    image: {
        height: 23,
        width: 20,
        left: 10,
        marginRight: 30,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    leaves: {
        marginBottom: 20,
        borderBottomWidth: 1,
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
