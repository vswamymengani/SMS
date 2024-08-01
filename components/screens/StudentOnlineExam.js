import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const StudentOnlineExam = ({ route }) => {
  const email = route.params.email;
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [profile, setProfile] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/studentProfile?email=${email}`);
        const profileData = response.data;
        setProfile(profileData);
        setClassName(profileData.className);
        setSection(profileData.section);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (email) {
      fetchProfileData();
    } else {
      setError('Email not provided');
    }
  }, [email]);

  useEffect(() => {
    if (className && section) {
      // Fetch questions from the backend
      axios.get(`http://10.0.2.2:3000/questions?className=${className}&section=${section}`)
        .then(response => {
          setQuestions(response.data);
          setTotalQuestions(response.data.length);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setError('Failed to load questions');
          console.error(error);
        });
    }
  }, [className, section]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    axios.post('http://10.0.2.2:3000/submit', { answers, email })
      .then(response => {
        const { score, totalQuestions, incorrectAnswers } = response.data;
        setScore(score);
        setTotalQuestions(totalQuestions);
        setIncorrectAnswers(incorrectAnswers);
        setSubmitted(true);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to submit answers');
        console.error(error);
      });
  };

  const renderQuestion = ({ item }) => (
    <View key={item.id} style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      {item.options.map((option, index) => (
        <TouchableOpacity
          key={`${item.id}-option-${index}`}
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
  );

  if (loading) {
    return <Text>Loading questions...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.length > 0 ? (
        questions.map(question => renderQuestion({ item: question }))
      ) : (
        <Text>No questions available</Text>
      )}
      {!submitted ? (
        <Button title="Submit" onPress={handleSubmit} />
      ) : (
        <View>
          <Text style={styles.scoreText}>Your score is: {score} / {totalQuestions}</Text>
          <Text style={styles.scoreText}>Incorrect answers: {incorrectAnswers}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
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

export default StudentOnlineExam;
