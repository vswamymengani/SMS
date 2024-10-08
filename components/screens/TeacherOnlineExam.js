import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

const TeacherOnlineExam = () => {
  const [questions, setQuestions] = useState([{ id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');

  // Handle change in question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // Handle change in option text
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Handle change in correct answer text
  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  // Add new question fields
  const addNewQuestionFields = () => {
    setQuestions([...questions, { id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  // Add questions to the backend
  const addQuestions = () => {
    axios.post('http://10.0.2.2:3000/questions', { className, section, questions })
      .then(response => {
        setQuestions([{ id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        Alert.alert('Success', 'Questions added successfully');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to add questions');
      });
  };

  // Handle option selection for the quiz
  const handleOptionSelect = (questionId, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option
    }));
  };

  const classNameData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }
  ];

  const sectionData = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' }
  ];

  // Submit answers and calculate score
  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  // Render a single question
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
          key={`${item.id}-option-${optionIndex}`} // Unique key for each option
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
          onChange={item => setClassName(item.value)}
          accessible={true}
          accessibilityLabel="Class"
        />
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
          onChange={item => setSection(item.value)}
          accessible={true}
          accessibilityLabel="Section"
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <Button title="Add New Question" onPress={addNewQuestionFields} />
            <Button title="Add Questions" onPress={addQuestions} />
          </>
        }
        data={questions}
        keyExtractor={item => item.id}
        renderItem={renderQuestion}
        ListFooterComponent={
          <>
            {questions.map(item => (
              <View key={item.id} style={styles.questionContainer}>
                <Text style={styles.questionText}>{item.question}</Text>
                {item.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={`${item.id}-option-${optionIndex}`} // Unique key for each option button
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
            <Button title="Submit" onPress={handleSubmit} />
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
    padding: 20
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
  questionBlock: {
    marginBottom: 20
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
  scoreText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  }
});

export default TeacherOnlineExam;
