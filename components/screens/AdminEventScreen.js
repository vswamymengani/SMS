import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const AdminEventScreen = () => {
  const [eventDescription, setEventDescription] = useState('');
  const [media, setMedia] = useState([]);

  const pickMedia = () => {
    const options = {
      mediaType: 'mixed', // 'photo' or 'video'
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled media picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const newMedia = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          description: '',
        };
        setMedia([...media, newMedia]);
      }
    });
  };

  const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('description', eventDescription);

        media.forEach((item, index) => {
            formData.append('mediaFiles', {
                uri: item.uri,
                type: item.type,
                name: `media_${index}.${item.type.split('/')[1]}`,
            });
            formData.append(`media[${index}][uri]`, item.uri);
            formData.append(`media[${index}][type]`, item.type);
            formData.append(`media[${index}][description]`, item.description);
        });

        const response = await fetch('http://10.0.2.2:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const responseText = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Text:', responseText);

        if (response.ok) {
            Alert.alert('Success', 'Event submitted successfully');
            setEventDescription('');
            setMedia([]);
        } else {
            Alert.alert('Error', `Failed to submit event: ${responseText}`);
        }
    } catch (error) {
        console.error('Submit Error: ', error);
        Alert.alert('Error', 'An error occurred while submitting the event');
    }
  };


  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Event Description:</Text>
      <TextInput
        style={{
          height: 60,
          borderColor: 'Black',
          borderWidth: 1,
          marginBottom: 16,
          padding: 8,
          textAlignVertical: 'top',
        }}
        multiline
        placeholder="Enter event Info"
        value={eventDescription}
        onChangeText={setEventDescription}
      />

      {media.map((item, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          {item.type.startsWith('image') ? (
            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, marginBottom: 8 }} />
          ) : (
            <Text>Video: {item.uri.split('/').pop()}</Text>
          )}
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              padding: 8,
            }}
            placeholder="Enter media description"
            value={item.description}
            onChangeText={(text) => {
              const newMedia = [...media];
              newMedia[index].description = text;
              setMedia(newMedia);
            }}
          />
        </View>
      ))}

      <Button title="Add Photo/Video" onPress={pickMedia} />

      <View style={{ marginTop: 16 }}>
        <Button title="Submit Event" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default AdminEventScreen;
