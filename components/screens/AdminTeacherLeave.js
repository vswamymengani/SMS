import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import axios from "axios";

const AdminTeacherLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTeacherLeaves = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/teacherLeaves');
                setLeaves(response.data);
            } catch (err) {
                setErrors({ general: 'Failed to load leaves' });
            }
        };
        fetchTeacherLeaves();
    }, []);

    const updateLeaveStatus = async (id, status) => {
        try {
            await axios.put(`http://10.0.2.2:3000/teacherLeaves/${id}`, { approval: status });
            setLeaves(leaves.filter(leave => leave.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const renderLeave = ({ item }) => (
        <View style={styles.leaveItem}>
            <Text style={styles.text}>Leave Purpose: {item.purpose}</Text>
            <Text style={styles.text}>Employee ID: {item.employeeid}</Text>
            <Text style={styles.text}>Start Date: {item.startdate} End Date: {item.enddate}</Text>
            <Text style={styles.text}>Explanation: {item.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Approve" onPress={() => updateLeaveStatus(item.id, "Approved")} />
                <Button title="Reject" onPress={() => updateLeaveStatus(item.id, "Rejected")} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {errors.general && <Text style={styles.error}>{errors.general}</Text>}
            <FlatList
                data={leaves}
                renderItem={renderLeave}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 3,
    },
    leaveItem: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderColor: 'black',
        borderWidth: 2,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#3F1175',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AdminTeacherLeave;
