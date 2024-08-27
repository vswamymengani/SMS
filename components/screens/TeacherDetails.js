import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TeacherDetails = () => {
    const navigation = useNavigation();
    const [teacherDetails, setTeacherDetails] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await axios.get(`http://18.60.190.183:3000/teacherDetails`);
                setTeacherDetails(response.data);
            } catch (err) {
                setErrors({ general: 'Failed to load Teacher Details' });
            }
        };
        fetchTeacherDetails();
    }, []);

    const filteredTeacherDetails = teacherDetails.filter(item =>
        item.employeeid.toString().includes(searchText)
    );

    const renderTeacherDetails = ({ item }) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.employeeid}</Text>
                <Text style={styles.cell}>{item.fullname}</Text>
                <Text style={styles.cell}>{item.email}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TeacherForm')}>
                    <Text style={styles.headText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ModifyTeacherInfo')} style={styles.box}>
                    <Text style={styles.headText}>Modify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Employee ID"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Employee ID</Text>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Email</Text>
                </View>
                {errors.general && <Text style={styles.error}>{errors.general}</Text>}
                <FlatList
                    data={filteredTeacherDetails}
                    renderItem={renderTeacherDetails}
                    keyExtractor={item => item.employeeid.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    box: {
        backgroundColor: '#3F1175',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        height: 50,
        width: 150,
    },
    headText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    searchContainer: {
        marginBottom: 10,
    },
    searchInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 40,
        width: '100%',
    },
    table: {
        borderWidth: 1,
        borderColor: 'black',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    error: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default TeacherDetails;
