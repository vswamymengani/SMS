import React, { useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import Image1 from "../assets/Verified.png";
import Image2 from "../assets/Back_Arrow.png";
import Image3 from '../assets/BackImage.png';

const TeacherHomework = ({route}) => {
    const navigation = useNavigation();
    const [className, setclassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [typeOfHomework, setTypeOfHomework] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [homework, setHomework] = useState('');
    const [errors, setErrors] = useState({});

    const [isModalVisible, setIsModalVisible] = useState(false);
    const {email} = route.params;

    const validate = () => {
        const newErrors = {};
        if (!className) newErrors.className = "Select the class name";
        if (!section) newErrors.section = "Select the Section";
        if (!subject) newErrors.subject = "Name of the subject";
        if (!typeOfHomework) newErrors.typeOfHomework = "Enter the type of homework";
        if (!title) newErrors.title = "Enter the Homework title";
        if (!duration) newErrors.duration = "Enter the duration";
        if (!homework) newErrors.homework = "Explain the Homework";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsModalVisible(true);
            return true;
        }
        return false;
    }

    const handleModalClose = () => {
        setIsModalVisible(false);
        navigation.navigate('TeacherHomeScreen',{ email });
    };

    const TeacherHomework = async () => {
        if (validate()) {
            axios.post("http://18.60.190.183:3000/teacherHomework", {
                className,
                section,
                subject,
                typeOfHomework,
                title,
                duration,
                homework,
                email
            })
                .then(response => {
                    if (response.status === 200) {
                        setIsModalVisible(true);
                    } else {
                        console.error("Failed to send", response.status);
                    }
                })
                .catch(error => {
                    console.error("Axios error", error);
                });
        }
    };

    const clearError = (field) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    }

    const classNameData = [
        { label: '1', value: "1" },
        { label: '2', value: "2" },
        { label: '3', value: "3" },
        { label: '4', value: "4" },
        { label: '5', value: "5" },
        { label: '6', value: "6" },
        { label: '7', value: "7" },
        { label: '8', value: "8" },
        { label: '9', value: "9" },
        { label: '10', value: "10" },
        { label: '11', value: "11" },
        { label: '12', value: "12" }
    ];
    const sectionData = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' }
    ];
    const subjectData = [
        { label: 'English', value: 'English' },
        { label: 'Telugu', value: 'Telugu' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Science', value: 'Science' },
        { label: 'Social Studies', value: 'Social Studies' },
        { label: 'Physics', value: 'Physics' },
        { label: 'Chemistry', value: 'Chemistry' },
        { label: 'Biology', value: 'Biology' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Image source={Image3} style={styles.bc} />
            <View style={styles.right}>
                <TouchableOpacity onPress={() =>navigation.navigate('TeacherHomeScreen',{email})}>
                    <Image source={Image2} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.head}>Homework</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TeacherHomeWorkList',{ email })}>
                     <Text style={styles.header}>List</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={classNameData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Class"
                value={className}
                onChange={item => { setclassName(item.value); clearError('className'); }}
                accessible={true}
                accessibilityLabel="Class"
            />
            {errors.className && <Text style={styles.error}>{errors.className}</Text>}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={sectionData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Section"
                value={section}
                onChange={item => { setSection(item.value); clearError('section'); }}
                accessible={true}
                accessibilityLabel="Section"
            />
            {errors.section && <Text style={styles.error}>{errors.section}</Text>}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={subjectData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Subject"
                value={subject}
                onChange={item => { setSubject(item.value); clearError('subject'); }}
                accessible={true}
                accessibilityLabel="Subject"
            />
            {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}
            <TextInput
                style={styles.text}
                value={typeOfHomework}
                placeholder="Enter the type of Home Work"
                onChangeText={(text) => { setTypeOfHomework(text); clearError('typeOfHomework'); }}
                accessible={true}
                accessibilityLabel="Enter the type of Home Work"
            />
            {errors.typeOfHomework && <Text style={styles.error}>{errors.typeOfHomework}</Text>}
            <TextInput
                style={styles.text}
                placeholder="Home work Title"
                value={title}
                onChangeText={(text) => { setTitle(text); clearError('title'); }}
                accessible={true}
                accessibilityLabel="Home work Title"
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}
            <TextInput
                style={styles.text}
                placeholder="Enter the Duration"
                value={duration}
                onChangeText={(text) => { setDuration(text); clearError('duration'); }}
                accessible={true}
                accessibilityLabel="Enter the Duration"
            />
            {errors.duration && <Text style={styles.error}>{errors.duration}</Text>}
            <TextInput
                style={styles.descriptionInput}
                placeholder="Explain the Home Work"
                value={homework}
                multiline
                numberOfLines={18}
                onChangeText={(text) => { setHomework(text); clearError('homework'); }}
                accessible={true}
                accessibilityLabel="Explain the Home Work"
            />
            {errors.homework && <Text style={styles.error}>{errors.homework}</Text>}

            <TouchableOpacity
                style={styles.sendButton}
                onPress={TeacherHomework}
                accessible={true}
                accessibilityLabel="Homework button">
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={Image1} style={styles.successImage} />
                        <Text style={styles.modalText}>Homework is sent successfully</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body:{
        padding:15,
        backgroundColor:'white',
        borderRadius:30,
    },
    bc:{
        height:'110%',
        width:'110%',
        position:'absolute',
    },
    right: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:40,
    },
    image:{
        height:23,
        width:18,
        left:10,
    },
    head:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
    },
    button: {
        backgroundColor: '#3F1175',
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 5,
    },
    header: {
        color: 'white',
        fontSize: 16,
        borderRadius: 20,
        borderColor: '#3F1175',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    dropdown: {
        height: 50,
        borderColor: '#3F1175',
        borderBottomWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 8,
        marginVertical: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color:'black',
        fontWeight:'bold',
    },
    selectedTextStyle: {
        fontSize: 16,
        color:'black',
        fontWeight:'bold',
    },
    sendButton: {
        backgroundColor: '#3F1175',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalButton: {
        backgroundColor: '#3F1175',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successImage: {
        width: 100,
        height: 100,
    },
    text: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#3F1175',
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 16,
        marginBottom:10,
        marginTop:10,
    },
    descriptionInput: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#3F1175',
        padding: 10,
        backgroundColor: 'white',
        fontSize: 16,
        textAlignVertical: 'top',
        // marginVertical: 10,
    },
});

export default TeacherHomework;
