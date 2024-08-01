import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import Image1 from '../assets/Back_Arrow.png';
import Image2 from '../assets/BackImage.png';

const TeacherComplaintList = ({ route }) => {
    const { email, employeeid } = route.params;
    const navigation = useNavigation();
    const [complaints, setComplaints] = useState([]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('all');
    const [filteredComplaintList, setFilteredComplaintList] = useState([]);
    const statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Resolved', value: 1 },
        { label: 'Pending', value: 0 },
    ];

    useEffect(() => {
        if (status === 'all') {
            setFilteredComplaintList(complaints);
        } else {
            const filteredData = complaints.filter(item => item.is_resolved === status);
            setFilteredComplaintList(filteredData);
        }
    }, [status, complaints]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/teacherComplaintList?employeeid=${employeeid}`);
                setComplaints(response.data.reverse());
                setFilteredComplaintList(response.data.reverse());
            } catch (error) {
                setErrors({ general: 'Unable to fetch the data' });
            }
        };
        fetchComplaints();
    }, [employeeid]);

    const renderItem = ({ item }) => (
        <View style={styles.complaints}>
            <Text style={styles.head1}>Complaint: {item.reason}</Text>
            <Text style={styles.text}>Explanation: {item.explanation}</Text>
            <Text style={styles.resolved}>
                {item.is_resolved !== 0 ? "Resolved" : "Pending"}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={Image2} style={styles.bc} />
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherComplaint1', { email })}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.head}>Complaints List</Text>
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
                    data={filteredComplaintList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: 23,
        width: 18,
        left: 5,
    },
    bc: {
        height: '110%',
        width: '110%',
        position: 'absolute',
    },
    body: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: '110%',
        padding: 10,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 60,
        top: 10,
        padding: 10,
    },
    head: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    head1: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    complaints: {
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        margin: 10,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    resolved: {
        color: 'white',
        backgroundColor: 'blue',
        fontSize: 16,
        marginHorizontal: 100,
        margin: 10,
        padding: 10,
        borderRadius: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default TeacherComplaintList;
