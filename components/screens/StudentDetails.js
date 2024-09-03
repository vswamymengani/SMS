import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput,ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const StudentDetails = () => {
    const navigation = useNavigation();
    const [studentDetails, setStudentDetails] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://18.60.190.183:3000/studentDetails`);
                setStudentDetails(response.data);
            } catch (err) {
                setErrors({ general: 'Failed to load student Details' });
            }
        };
        fetchStudentDetails();
    }, []);

    const filteredStudentDetails = studentDetails.filter(item =>
        item.admissionid.toString().includes(searchText)
    );

    const renderStudentDetails = ({ item }) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.fullname}</Text>
                <Text style={styles.cell}>{item.className}</Text>
                <Text style={styles.cell}>{item.section}</Text>
                <Text style={styles.cell}>{item.admissionid}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AdminStudentForm')} >
                    <Text style={styles.headText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('StudentModify')} style={styles.box}>
                    <Text style={styles.headText}>Modify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Admission ID"
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            <FlatList
                contentContainerStyle={styles.viewcontainer}
                ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Name</Text>
                        <Text style={styles.headerText}>Class</Text>
                        <Text style={styles.headerText}>Section</Text>
                        <Text style={styles.headerText}>Admission No</Text>
                    </View>
                )}
                data={filteredStudentDetails}
                renderItem={renderStudentDetails}
                keyExtractor={item => item.admissionid.toString()}
                ListEmptyComponent={<Text style={styles.error}>{errors.general}</Text>}
            />
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    viewcontainer:{
        flexGrow:1,
        borderWidth:1,
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
    table:{
        borderWidth:1,
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

export default StudentDetails;
