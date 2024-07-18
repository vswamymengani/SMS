import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/BackArrow.png';

const StudentComplaintList = ({ route }) => {
    const email = route.params.email;
    const navigation = useNavigation();
    const [complaints, setComplaints] = useState([]);
    const [errors, setErrors] = useState({});
    const [fullname, setFullName] = useState('');
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/studentComplaints', { params: { fullname, className, section } });
                setComplaints(response.data.reverse());
            } catch (error) {
                setErrors({ general: 'Unable to fetch the data' });
            }
        };
        fetchComplaints();
    }, [fullname, className, section]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/profile?email=${email}`);
                setProfile(response.data);
                setFullName(response.data.fullname);
                setClassName(response.data.className);
                setSection(response.data.section);
            } catch (err) {
                setErrors(prevErrors => ({ ...prevErrors, profile: 'Failed to load profile data' }));
            }
        };
        if (email) {
            fetchProfile();
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: 'No email provided' }));
        }
    }, [email]);

    const renderItem = ({ item }) => (
        <View style={styles.complaints}>
            <Text style={styles.head1}>Complaint: {item.reason}</Text>
            <Text style={styles.text}>Explanation: {item.explanation}</Text>
            <Text style={styles.resolved}>
                {item.is_resolved !== null ? "Resolved" : "Pending"}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('StudentComplaint', { email })}>
                    <Image source={Image1} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.head}>Complaints List</Text>
            </View>
            <View style={styles.box}>
            <FlatList
                data={complaints}
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
        height: 30,
        width: 30,
        right: 110,
    },
    box:{
        padding:10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 2,
        padding: 10,
    },
    head: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    head1: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    complaints: {
        padding: 10,
        borderRadius: 20,
        borderWidth:2,
        backgroundColor: 'white',
        justifyContent: 'center',
        margin:10,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    resolved: {
        color: 'white',
        backgroundColor: 'blue',
        fontSize: 16,
        marginHorizontal:100,
        margin:10,
        padding:10,
        borderRadius:30,
        textAlign:'center',
        fontWeight: 'bold',
    },
});

export default StudentComplaintList;
