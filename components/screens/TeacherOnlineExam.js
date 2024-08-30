import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

const TeacherOnlineExam = ({route}) => {
  const [questions, setQuestions] = useState([{ id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [employeeid, setemployeeid] = useState('');
  const email = route.params.email;


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

  useEffect(() => {
    const fetchemployeeid = async () => {
      try {
        const response = await axios.get(`http://18.60.190.183:3000/employee?email=${email}`);
        setemployeeid(response.data.employeeid);
      } catch (error) {
        console.error('Error fetching employee ID:', error);
      }
    };
  
    fetchemployeeid();
  }, [email]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addNewQuestionFields = () => {
    setQuestions([...questions, { id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const addQuestions = () => {
    axios.post('http://18.60.190.183:3000/questions', { className, section, subject, questions, employeeid })
      .then(response => {
        setQuestions([{ id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        Alert.alert('Success', 'Questions added successfully');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to add questions');
      });
  };

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option
    }));
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

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const renderQuestion = ({ item, index }) => (
    <View style={styles.questionBlock}>
      <TextInput
        style={styles.input}
        placeholder="Enter question"
        value={item.question}
        onChangeText={(value) => handleQuestionChange(index, value)}
      />
      {item.options.map((option, optionIndex) => (
        <TextInput
          key={`${item.id}-option-${optionIndex}`}
          style={styles.input}
          placeholder={`Option ${optionIndex + 1}`}
          value={option}
          onChangeText={(value) => handleOptionChange(index, optionIndex, value)}
        />
      ))}
      <TextInput
        style={styles.input}
        placeholder="Enter correct answer"
        value={item.correctAnswer}
        onChangeText={(value) => handleCorrectAnswerChange(index, value)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
      <View style={styles.dropdownRow2}>
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle2}
          selectedTextStyle={styles.selectedTextStyle2}
          data={classOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Class"
          value={className}
          onChange={item => setClassName(item.value)}
          accessible={true}
          accessibilityLabel="Class"
        />
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
          onChange={item => setSection(item.value)}
          accessible={true}
          accessibilityLabel="Section"
        />
      </View>
      <View style={styles.dropdownRow2}>
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle2}
          selectedTextStyle={styles.selectedTextStyle2}
          data={subjectData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Subject"
          value={subject}
          onChange={item => setSubject(item.value)}
          accessible={true}
          accessibilityLabel="Subject"
        />
      </View>
      </View>
      <FlatList
        ListHeaderComponent={null}
        data={questions}
        style={styles.list}
        keyExtractor={item => item.id}
        renderItem={renderQuestion}
        ListFooterComponent={
          <>
            {questions.map(item => (
              <View key={item.id} style={styles.questionContainer}>
                <Text style={styles.questionText}>{item.question}</Text>
                {item.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={`${item.id}-option-${optionIndex}`}
                    style={[
                      styles.optionButton,
                      answers[item.id] === option && styles.selectedOption
                    ]}
                    onPress={() => handleOptionSelect(item.id, option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={styles.buttonRow}>
              <Button title="Add New Question" onPress={addNewQuestionFields} />
              <Button title="Submit" onPress={addQuestions} />
            </View>
            {score !== null && (
              <Text style={styles.scoreText}>Your score is: {score} / {questions.length}</Text>
            )}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10
  },
  top:{
    padding:10,
  },
  dropdownRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown2: {
    width: '48%',
    borderWidth: 2,
    color: 'black',
    padding: 8,
    borderRadius: 10,
  },
  list:{
    height:'100%',
  },
  questionBlock: {
    marginBottom: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  questionContainer: {
    marginBottom: 20
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 5
  },
  selectedOption: {
    backgroundColor: '#cfc'
  },
  optionText: {
    fontSize: 16
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 70,
  },
  scoreText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  }
});

export default TeacherOnlineExam;

