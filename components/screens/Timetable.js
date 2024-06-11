import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const accessTimeImage = require('../assets/access_time.png');
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Homescreen');
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const getBoxStylesAndTexts = () => {
    switch (selectedDay) {
      case 'Monday':
        return [
          { backgroundColor: '#DE3E48', text: 'Social', person: 'Ritesh Deshmukh', locationText: '704', timeText: '08:00 -10:00' },
          { backgroundColor: '#DE3EBB', text: 'Science', person: 'Kriti Sanon', locationText: '203', timeText: '13:30 -15:00' },
          { backgroundColor: '#3E61DE', text: 'English', person: 'Sunny Deol', locationText: '316', timeText: '16:30 -17:30' }
        ];
      case 'Tuesday':
        return [
          { backgroundColor: '#41DE3E', text: 'Maths', person: 'Akshaya Kumar', locationText: '420', timeText: '8:00 -9:00' },
          { backgroundColor: '#3E61DE', text: 'Hindi', person: 'Sunny Deol', locationText: '316', timeText: '12:30 -13:30' },
          { backgroundColor: '#DE3E48', text: 'Dance', person: 'Ritesh Deshmukh', locationText: '704', timeText: '18:00 -19:00' }
        ];
      case 'Wednesday':
        return [
          { backgroundColor: '#3E61DE', text: 'Drawing', person: 'John Abraham', locationText: '316', timeText: '12:30 -1:30' },
          { backgroundColor: '#41DE3E', text: 'Sports', person: 'Shahid Kapoor', locationText: '420', timeText: '12:00 -15:00' },
          { backgroundColor: '#D1DE3E', text: 'Maths', person: 'Abhishek Bachchan', locationText: '316', timeText: '16:30 -17:30' }
        ];
      default:
        return [];
    }
  };

  const boxes = getBoxStylesAndTexts();

  return (
    <View style={{ flex: 1 }}>

      <View
        style={{
          width: 390,
          height: 89.39,
          backgroundColor: '#3F1175',
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        
        <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 22.87, left: 12 }}>
          <Image source={require('../assets/arrow-left.png')} style={{ width: 26, height: 22.87, tintColor: '#ffffff' }} />
        </TouchableOpacity>

        <Text style={{
          width: 127.92,
          height: 32.42,
          top: 14.08,
          left: 75.92,
          fontFamily: 'Open Sans',
          fontSize: 24,
          fontWeight: '400',
          lineHeight: 32.68,
          color: '#ffffff',
          position: 'absolute',
          opacity: 1, 
        }}>Time Table</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >

        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDayClick(day)}
            style={{
              width: 96,
              height: 31,
              borderRadius: 50,
              backgroundColor: selectedDay === day ? '#FE9900' : '#FE990080',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5, 
            }}
          >
            <Text style={{ color: 'black' }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {boxes.map((box, index) => (
        <View
          key={index}
          style={{
            width: 370,
            height: 147.6,
            top: 187.09 + index * 169.43, 
            left: 10,
            borderRadius: 17,
            borderWidth: 1,
            backgroundColor: box.backgroundColor,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{
            position: 'absolute',
            width: index === 0 ? 203 : index === 1 ? 148 : 169,
            height: 24.95,
            top: index === 0 ? 198.53 - 187.09 : index === 1 ? 367.95 - (187.09 + 169.43) : 537.37 - (187.09 + 2 * 169.43),
            left: index === 0 ? 94 - 10 : index === 1 ? 121 - 10 : 107 - 10,
            fontFamily: 'Inria Serif',
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 23.98,
            textAlign: 'center',
            opacity: 1, 
          }}>{index === 0 && selectedDay === 'Monday' ? 'Social' : box.text}</Text>
          <View
            style ={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: index === 0 ? 283.76 - 187.09 : index === 1 ? 453.18 - (187.09 + 169.43) : 622.61 - (187.09 + 2 * 169.43),
              left: 23 - 10,
            }}
          >
            <Image
              source={require('../assets/location_pin.png')}
              style={{
                width: 24,
                height: 24.95,
                marginRight: 5,
                opacity: 1,
              }}
            />
            <Text style={{
              fontFamily: 'Inria Serif',
              fontSize: 17,
              fontWeight: '400',
              lineHeight: 20.38,
              textAlign: 'center',
              opacity: 1,
            }}>{box.locationText}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: index === 0 ? 283.76 - 187.09 : index === 1 ? 453.18 - (187.09 + 169.43) : 622.61 - (187.09 + 2 * 169.43),
              left: 238 - 10,
            }}
          >
            <Image
              source={ accessTimeImage}
              style={{
                width: 24,
                height: 24.95,
                opacity: 1,
              }}
            />
            <Text style={{
              fontFamily: 'Inria Serif',
              fontSize: 17,
              fontWeight: '400',
              lineHeight: 20.38,
              textAlign: 'center',
              opacity: 1,
              marginLeft: 5, // Add marginLeft to create space between image and text
            }}>{box.timeText}</Text>
          </View>
          <View
            style={{
              width: 339.01,
              height: 0,
              top: 24.95 + 10, // Positioning the line below the text with some margin
              left: 22 - 10, // Adjusting the left position relative to the box
              borderColor: '#000',
              borderWidth: 1,
              borderTopWidth: 1,
              position: 'absolute',
            }}
          />
          <View style ={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: index === 0 ? 241.14 - 187.09 : index === 1 ? 410.57 - (187.09 + 169.43) : 579.99 - (187.09 + 2 * 169.43), left: index === 0 ? 128 - 10 : index === 1 ? 153 - 10 : 149 - 10 }}>
            <Image source={require('../assets/Person.png')} style={{
              width: 18,
              height: 19,
              tintColor: 'black', // To set the image color to black
              marginRight: 5,
            }} />
            <Text style={{
              fontFamily: 'Inria Serif',
              fontSize: 17,
              fontWeight: '400',
              lineHeight: 20.38,
              textAlign: 'center',
              opacity: 1,
            }}>{box.person}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 24,
              height: 24.95,
              position: 'absolute',
              top: index === 0 ? 198.53 - 187.09 : index === 1 ? 367.95 - (187.09 + 169.43) : 537.37 - (187.09 + 2 * 169.43),
              left: index === 2 ? 334 : 338,
            }}
            onPress={() => console.log('Expand more pressed')}
          >
            <Image
              source={require('../assets/expand_more.png')}
              style={{
                width: '100%',
                height: '100%',
                gap: 0,
                opacity: 1,
              }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Timetable;