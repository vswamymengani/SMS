import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import Image2 from '../assets/Verified.png';

const TeacherExamResults = ({ route }) => {
    const email = route.params.email;
    const navigation = useNavigation();
    const [teacherProfile, setTeacherProfile] = useState([]);
    const [employeeid, setEmployeeid] = useState('');
    const [errors, setErrors] = useState({});
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [examType, setExamType] = useState('');
    const [subject, setSubject] = useState('');
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchTeacherProfile = async () => {
          try {
            const response = await axios.get(`http://18.60.190.183:3000/teacherProfile?email=${email}`);
            setTeacherProfile(response.data);
            setEmployeeid(response.data.employeeid);
          } catch (err) {
            setErrors('Failed to load profile data');
          }
        };
        if (email) {
          fetchTeacherProfile();
        } else {
          setErrors('No email provided');
        }
      }, [email]);

    useEffect(() => {
        const fetchStudentDetails = async () => {
          if (className && section) {
            try {
              const response = await axios.get('http://18.60.190.183:3000/studentResults', {
                params: { className, section }
              });
              setStudents(response.data);
            } catch (error) {
              console.error("Error fetching student details:", error);
            }
          }
        };
        fetchStudentDetails();
      }, [className, section]);
      

    const validate = () => {
        const newErrors = {};
        if (!className) newErrors.className = "Select the class name";
        if (!section) newErrors.section = "Select the section";
        if (!examType) newErrors.examType = "Select the exam type";
        if (!subject) newErrors.subject = "Select the subject";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        navigation.navigate("TeacherExamResults", { email });
    };

    const handleMarksChange = (rollNo, text) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [rollNo]: text
        }));
    };

    const handleSubmit = async () => {
        if (validate()) {
            const marksData = students.map(student => ({
                className,
                section,
                examType,
                subject,
                rollNo: student.rollNo,
                fullname: student.fullname,
                marks: marks[student.rollNo] || '',
                employeeid,
            }));
    
            try {
                const response = await axios.post('http://18.60.190.183:3000/teacherExamResults', marksData);
                console.log(response.data); // Log response from backend for debugging
                setIsModalVisible(true);
            } catch (error) {
                console.error("Error submitting marks:", error);
                Alert.alert('Error', 'Failed to submit marks');
            }
        }
    };

    const clearError = (field) => {
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

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
    const examTypeData = [
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Half Yearly', value: 'Half Yearly' },
        { label: 'Finals', value: 'Finals' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() =>navigation.navigate('PrevResults')}>
                    <Text style={styles.headText}>Prev</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dropdownRow2}>
                <Dropdown
                    style={styles.dropdown2}
                    placeholderStyle={styles.placeholderStyle2}
                    selectedTextStyle={styles.selectedTextStyle2}
                    data={classNameData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Class"
                    value={className}
                    onChange={item => { setClassName(item.value); clearError('className'); }}
                    accessible={true}
                    accessibilityLabel="Class"
                />
                {errors.className && <Text style={styles.error}>{errors.className}</Text>}
                <Dropdown
                    style={styles.dropdown2}
                    placeholderStyle={styles.placeholderStyle2}
                    selectedTextStyle={styles.selectedTextStyle2}
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
            </View>
                <View style={styles.dropdownRow2}>
                <Dropdown
                    style={styles.dropdown2}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={examTypeData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Exam Type"
                    value={examType}
                    onChange={item => { setExamType(item.value); clearError('examType'); }}
                    accessible={true}
                    accessibilityLabel="Exam Type"
                />
                {errors.examType && <Text style={styles.error}>{errors.examType}</Text>}
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
                </View>
            {students.length > 0 && (
                <View>
                    <Text style={styles.boldText}>Student Marks</Text>
                    <View style={styles.marks}>
                            <Text style={styles.text}>Name</Text>
                            <Text style={styles.text}>Roll No</Text>
                            <Text style={styles.text}>Marks</Text>
                    </View>
                    {students.map(student => (
                        <View key={student.rollNo} style={styles.studentRow}>
                            <Text style={styles.studentText}>{student.fullname}</Text>
                            <Text style={styles.studentText}>{student.rollNo}</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Marks"
                                value={marks[student.rollNo] || ''}
                                onChangeText={text => { handleMarksChange(student.rollNo, text); clearError('marks'); }}
                            />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                        <Text style={styles.sendButtonText}>Submit Marks</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={Image2} style={styles.successImage} />
                        <Text style={styles.modalText}>Marks submitted successfully</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
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
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    right: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    marks:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    button: {
        backgroundColor: '#3F1175',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50%',
    },
    head: {
        backgroundColor: '#3F1175',
        padding: 5,
        borderRadius: 10,
        height:40,
        width: '20%',
        left:300,
        marginBottom:10,
    },
    headText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
    },
    header: {
        borderWidth: 3,
        color: 'white',
        fontSize: 18,
        borderRadius: 20,
        borderColor: '#3F1175',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    dropdownRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        width: '100%', // Adjusted to ensure the elements fit within the container
    },
    dropdownContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    placeholderStyle2: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    selectedTextStyle2: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    dropdown2: {
        borderColor: '#3F1175',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
        width: '48%', // Adjusted to fit within the container
        height: 50,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#3F1175',
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 50,
    },
    boldText: {
        fontWeight: 'bold',
        marginVertical: 16,
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    studentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        padding: 10,
    },
    studentText: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 20,
        color: 'black',
    },
    attendanceDropdown: {
        borderColor: '#3F1175',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: '30%',
        height: 40,
    },
    attendancePlaceholder: {
        fontSize: 14,
        color: 'black',
    },
    attendanceSelectedText: {
        fontSize: 14,
        color: 'black',
    },
    dropdown: {
        borderColor: '#3F1175',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
        height: 50,
        width: '48%', // Adjusted to fit within the container
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
});

export default TeacherExamResults;
