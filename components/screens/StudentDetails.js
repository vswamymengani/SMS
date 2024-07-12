import React, {useState, useEffect} from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const StudentDetails = () => {
    const navigation = useNavigation();
    const [studentDetails, setStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:3000/studentDetails`);
                setStudentDetails(response.data);
            } catch (err) {
                setErrors({ general: 'Failed to load student Details' });
            }
        };
        fetchStudentDetails();
    }, []);

    const renderStudentDetails = ({ item }) => {
        return (
            <View style={styles.details}>
                {/* <Text style={styles.text1}>{item.rollno}</Text> */}
                <Text style={styles.text1}>{item.fullname}</Text>
                <Text style={styles.text4}>{item.dateofbirth}</Text>
                <Text style={styles.text5}>{item.className}</Text>
                <Text style={styles.text5}>{item.section}</Text>
                <Text style={styles.text6}>{item.admissionid}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style= {styles.head}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AdminStudentForm')} >
                    <Text style={styles.headText}>Register</Text>
                </TouchableOpacity>    
                <Text style={styles.headText}>Modify</Text>
            </View>
            <View style={styles.heading}>
                {/* <Text style={styles.text}>Roll No</Text> */}
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text2}>D.O.B</Text>
                <Text style={styles.text7}>Class</Text>
                <Text style={styles.text7}>Section</Text>
                <Text style={styles.text3}>Admission No</Text>
            </View>
            {errors.general && <Text style={styles.error}>{errors.general}</Text>}
                <FlatList
                  data={studentDetails}
                  renderItem={renderStudentDetails}
                  keyExtractor={item => item.admissionid.toString()}
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
        alignItems:'flex-start',
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
        color:'red',
        margin:10,
        left:0,
        fontWeight:'bold',
    },
    text1:{
        color:'black',
        margin:10,
        left:0,
    },
    text2:{
        color:'red',
        margin:10,
        left:10,
        fontWeight:'bold',
    },
    text7:{
        color:'red',
        margin:10,
        left:40,
        fontWeight:'bold',
    },
    text3:{
        color:'red',
        margin:10,
        left:18,
        fontWeight:'bold',
    },
    text4:{
        color:'black',
        margin:10,
        left:-20,
    },
    text5:{
        color:'black',
        margin:10,
    },
    text6:{
        color:'black',
        margin:10,
    },
    error: {
        color: 'red',
    },
});

export default StudentDetails;
