import React,{useState} from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Modal,Image, ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/Verified.png';

const TeacherAnnouncements = ({route}) =>{
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [subject, setSubject] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const validate =() =>{
        const newErrors = {};
        if(!subject) newErrors.subject = 'Enter the Subject';
        if(!explanation) newErrors.explanation = 'Write the Explanation';
        setErrors(newErrors);

        if(Object.keys(newErrors).length ===0){
            setIsModalVisible(true);
            return true;
        }
        return false;
    };

    const handleSend =() =>{
        setIsModalVisible(true);
    };
    const handleAnnouncement = async () =>{
        if(validate()){
            try{
                const response = await axios.post('http://10.0.2.2:3000/announcements',{
                    subject,
                    explanation,
                    reciver: "Teacher",
                });
                if(response.status ===200){
                   handleSend(); 
                }else{
                    console.error("failed to send",response.status);
                }
            }
            catch (error){
                console.error('axios error',error);
            }
        }
    };

    const clearError = (field) =>{
        setErrors((prevErrors) =>{
            const newErrors ={...prevErrors};
            delete newErrors[field];
            return newErrors;
        });
    };

    const handleModalClose = () =>{
        setIsModalVisible(false);
        navigation.navigate('AdminTeacherHomeScreen');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text1}>Subject</Text>
            <View>
                <TextInput
                    style={styles.text}
                    placeholder="Enter the Subject"
                    value={subject}
                    onChangeText={(text) =>{setSubject(text); clearError('subject');}}
                />
                {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}
            </View>
            <Text style={styles.text1}>Explanation</Text>
            <View>
                <TextInput
                    placeholder="Explain about the Announcement"
                    value={explanation}
                    style={styles.text3}
                    multiline
                    numberOfLines={18}
                    onChangeText={(text) =>{setExplanation(text); clearError('explanation'); }}
                /> 
                {errors.explanation && <Text style={styles.error}>{errors.explanation}</Text>}   
            </View>
            <View>
                <TouchableOpacity style ={styles.button} onPress={handleAnnouncement} >
                    <Text style={styles.text2}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={Image1} style = {styles.successImage} />
                        <Text style= {styles.modalText}>Announcement send successfully</Text>
                        <TouchableOpacity onPress={handleModalClose} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    text1:{
        fontSize:15,
        color:'black',
        fontWeight:'400',
    },
    text: {
        borderWidth: 2,
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        borderColor: '#3F1175',
        textAlign: 'auto',
        padding: 15,
        marginVertical: 10,
    },
    text3: {
        borderWidth: 2,
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        borderColor: '#3F1175',
        padding: 15,
        marginVertical: 10,
        textAlignVertical:'top',
    },
    button: {
        backgroundColor: '#3F1175',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 20,
    },
    text2: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    successImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
    },
    modalButton: {
        backgroundColor: '#3F1175',
        padding: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default TeacherAnnouncements;