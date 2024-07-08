import React, {useState, useEffect} from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TeacherDetails = () => {
    const navigation = useNavigation();
    const [teacherDetails, setTeacherDetails] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/teacherDetails`);
                setTeacherDetails(response.data);
            } catch (err) {
                setErrors({ general: 'Failed to load Teacher Details' });
            }
        };
        fetchTeacherDetails();
    }, []);

    const renderTeacherDetails = ({ item }) => {
        return (
            <View style={styles.details}>
                <Text style={styles.text1}>{item.employeeid}</Text>
                <Text style={styles.text1}>{item.fullname}</Text>
                <Text style={styles.text1}>{item.dateofbirth}</Text>
                <Text style={styles.text1}>{item.email}</Text>
                <Text style={styles.text1}>{item.mobileNo}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style= {styles.head}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TeacherForm')} >
                    <Text style={styles.headText}>Register</Text>
                </TouchableOpacity>    
                <Text style={styles.headText}>Modify</Text>
            </View>
            <View style={styles.heading}>
                <Text style={styles.text}>Id</Text>
                <Text style={styles.text2}>Name</Text>
                <Text style={styles.text2}>D.O.B</Text>
                <Text style={styles.text2}>Email</Text>
                <Text style={styles.text}>Mobile</Text>
            </View>
            {errors.general && <Text style={styles.error}>{errors.general}</Text>}
                <FlatList
                  data={teacherDetails}
                    renderItem={renderTeacherDetails}
                    keyExtractor={(item, index) => item.employeeid ? item.employeeid.toString() : index.toString()}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
    },
    head:{
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
    },
    heading:{
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'flex-start',
        borderColor:'black',
        borderWidth:2,
        width:'100%',
    },
    details:{
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
        borderColor:'black',
        borderWidth:2,
        borderTopWidth:0,
        width:'100%',
    },
    headText:{
        backgroundColor: '#3F1175',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 20,
        height:50,
        width:150,
        color:'white',
        fontSize:18,
        
    },
    text:{
        color:'black',
        margin:10,
        left:-20,
    },
    text1:{
        color:'black',
        margin:10,
    },
    text2:{
        color:'black',
        margin:10,
        left:-50,
    },
    error: {
        color: 'red',
    },
});

export default TeacherDetails;
