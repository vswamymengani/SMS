import React,{useState ,useEffect} from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Modal,Image, ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Image1 from '../assets/Verified.png';
import Image2 from '../assets/Back_Arrow.png';
import Image3 from '../assets/BackImage.png';
import { Dropdown } from "react-native-element-dropdown";

const TeacherStudyMaterial = ({route}) =>{
    const navigation = useNavigation();
    const email = route.params.email;
    const [errors, setErrors] = useState({});
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [topic , setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/classDetails');
        const classData = response.data;
        setClasses(classData);
        setClassOptions(classData.map(cls => ({ label: cls.className, value: cls.className })));
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (className) {
      const filteredSections = classes
        .filter(cls => cls.className === className)
        .flatMap(cls => cls.sections); // Assuming `sections` is an array in the `ClassDetails` table
      setSections(filteredSections);
      setSectionOptions(filteredSections.map(sec => ({ label: sec, value: sec })));
    } else {
      setSectionOptions([]);
    }
  }, [className, classes]);

    const validate =() =>{
        const newErrors = {};
        if(!subject) newErrors.subject = 'Enter the Subject';
        if(!explanation) newErrors.explanation = 'Write the Explanation';
        if(!className) newErrors.className ="Enter the Class" ;
        if(!section) newErrors.section = "Enter the Section" ;
        if(!topic) newErrors.topic = "Enter the Topic" ;
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
                const response = await axios.post('http://18.60.190.183:3000/teacherStudyMaterial',{
                    className,
                    section,
                    subject,
                    topic,
                    explanation,
                    email,
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

    const handleModalClose = () =>{
        setIsModalVisible(false);
        navigation.navigate('TeacherHomeScreen',{email});
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={Image3} style={styles.bc} />
            <View style={styles.head}>
                <TouchableOpacity onPress={() =>navigation.navigate('TeacherHomeScreen',{ email})}>
                    <Image source={Image2} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.heading}>Study Material</Text>
            </View>
        <View style={styles.body}>
        <View style={styles.dropdownRow2}>
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle2}
          selectedTextStyle={styles.selectedTextStyle2}
          data={classOptions}
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
          data={sectionOptions}
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
      <View style={styles.dropdownRow}>
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
        </View>
        <Text style={styles.text1}>Topic</Text>
            <View>
                <TextInput
                    style={styles.text}
                    placeholder="Enter the Topic"
                    value={topic}
                    onChangeText={(text) =>{setTopic(text); clearError('topic');}}
                />
                {errors.topic && <Text style={styles.error}>{errors.topic}</Text>}
            </View>
            <Text style={styles.text1}>Explanation</Text>
            <View>
                <TextInput
                    placeholder="Explain about the Topic"
                    value={explanation}
                    style={styles.text3}
                    multiline
                    numberOfLines={10}
                    onChangeText={(text) =>{setExplanation(text); clearError('explanation'); }}
                /> 
                {errors.explanation && <Text style={styles.error}>{errors.explanation}</Text>}   
            </View>
            <View>
                <TouchableOpacity style ={styles.button} onPress={handleAnnouncement} >
                    <Text style={styles.text2}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={Image1} style = {styles.successImage} />
                        <Text style= {styles.modalText}>Study Material send successfully</Text>
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
    },
    bc: {
        height: '110%',
        width: '110%',
        position: 'absolute',
    },
    body: {
        backgroundColor: 'white',
        height: '110%',
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 40,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    image: {
        height: 23,
        width: 20,
        left: 10,
        marginRight: 30,
    },
    text1:{
        fontSize:15,
        color:'black',
        fontWeight:'400',
    },
    dropdownRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding:10,
        marginTop:20,
    },
    dropdown2: {
        width: '48%',
        borderBottomWidth:1,
        color:'black',
        padding:10,
        borderRadius:10,
        borderColor: '#3F1175',
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding:10,
    },
    dropdown: {
        width: '48%',
        borderBottomWidth:1,
        padding:8,
        borderColor: '#3F1175',
        borderRadius:10,
    },
    placeholderStyle2: {
        fontSize: 16,
        color: '#8a8a8a',
    },
    selectedTextStyle2: {
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#8a8a8a',
    },
    selectedTextStyle: {
        fontSize: 16,
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

export default TeacherStudyMaterial;