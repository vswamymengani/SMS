import React, {useState, useEffect} from "react";
import {Text,View,StyleSheet,TouchableOpacity,FlatList,Button} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AdminTeacherComplaints =({route}) =>{
    const navigation = useNavigation();
    const [complaints,setComplaints] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() =>{
        const fetchComplaints = async () =>{
            try{
                const response = await axios.get('http://10.0.2.2:3000/teacherComplaints');
                setComplaints(response.data);
            }
            catch(err){
                setErrors({general:'Failed to load complaints'});
            }
        };
        fetchComplaints();
    },[]);

    const resolveComplaint = async (id) =>{
        try{
            await axios.put(`http://10.0.2.2:3000/teacherComplaints/${id}/resolve`);
            setComplaints(complaints.filter(complaint =>complaint.id !==id));
        }catch(err){
            console.error(err);
        }
    };

    const renderComplaint = ({item}) =>(
        <View style={styles.complaintItem}>
            <Text style={styles.text}>EmployeeID: {item.employeeid}</Text>
            <Text style={styles.text}>Type: {item.typeOfComplaint}</Text>
            <Text style={styles.text}>Reason: {item.reason}</Text>
            <Text style={styles.text}>Explanation: {item.explanation}</Text>
            <Button title="Resolve" onPress={() => resolveComplaint(item.id)} />
        </View>
    );
    return(
        <View style={styles.container}>
            {errors.general && <Text style = {styles.error}>{errors.general}</Text>}
            <FlatList
                data={complaints}
                renderItem={renderComplaint}
                keyExtractor={(item, index) => item.id? item.id.toString() : item.toString()}
                />
        </View>
    )
 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 3,
    },
    complaintItem: {
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
    error: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
    },
});

export default AdminTeacherComplaints;
  