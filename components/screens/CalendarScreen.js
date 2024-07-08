import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = ({route}) => {
  const navigation = useNavigation();
  const email = route.params;

  const handleBack = () => {
    navigation.navigate('Homescreen',{ email });
  };

  const handleIconPress = () => {
    setDropdownVisible(true);
  };

  const handlePreviousPress = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextPress = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 1));
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

  useEffect(() => {
    if (selectedDate) {
      const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
      setFormattedSelectedDate(selectedFullDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' }));
    }
  }, [selectedDate, currentDate]);

  const [formattedSelectedDate, setFormattedSelectedDate] = useState('Sun, April 12');

  const renderCalendar = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);

    const firstDayOffset = (firstDay + 6) % 7;

    return (
      <View style={styles.calendar}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </Text>
          <TouchableOpacity style={styles.monthButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/Down.png')} style={styles.monthButtonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.daysRow}>
          {days.map((day, index) => (
            <Text key={`day-${index}`} style={styles.day}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.datesContainer}>
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.dateButton} />
          ))}
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.selectedDateButton,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date && styles.selectedDateText,
                ]}
              >
                {date}
              </Text>
            </TouchableOpacity>
          ))}
          {Array.from({ length: 42 - firstDayOffset - dates.length }).map((_, i) => (
            <View key={`extra-${i}`} style={styles.dateButton} />
          ))}
        </View>
        <View style={styles.calendarFooter}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderYearSelector = () => {
    const startYear = 1900;
    const endYear = new Date().getFullYear() + 50;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    return (
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.smallModalContent}>
            <ScrollView>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.yearButton}
                  onPress={() => {
                    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.yearText}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderMonthYearDropdown = () => {
    return (
      <Modal visible={dropdownVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownTitle}>Select Month and Year</Text>
            <TextInput
              style={styles.input}
              placeholder="Month"
              value={selectedMonth}
              onChangeText={setSelectedMonth}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Year"
              value={selectedYear}
              onChangeText={setSelectedYear}
              keyboardType="numeric"
            />
            <View style={styles.dropdownFooter}>
              <TouchableOpacity
                style={styles.dropdownFooterButton}
                onPress={() => setDropdownVisible(false)}
              >
                <Text style={styles.footerButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownFooterButton}
                onPress={() => {
                  const month = parseInt(selectedMonth, 10) - 1;
                  const year = parseInt(selectedYear, 10);
                  if (!isNaN(month) && !isNaN(year) && month >= 0 && month <= 11) {
                    setCurrentDate(new Date(year, month, 1));
                  }
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.footerButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
          <Image source={require('../assets/arrow-left.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.text}>Calendar</Text>
      </View>
      <View style={styles.newRectangle}>
        <Text style={styles.selectDateText}>SELECT DATE</Text>
        <View style={styles.textWithIcon}>
          <Text style={styles.newRectangleText}>{formattedSelectedDate}</Text>
          <TouchableOpacity onPress={handleIconPress} style={styles.iconButton}>
            <Image source={require('../assets/Icon.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calendarRectangle}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handlePreviousPress} style={styles.navButton}>
            <Image source={require('../assets/Back.png')} style={styles.navButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPress} style={styles.navButton}>
            <Image source={require('../assets/Next.png')} style={styles.navButtonImage} />
          </TouchableOpacity>
        </View>
        {renderCalendar()}
      </View>
      {renderYearSelector()}
      {renderMonthYearDropdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
  },
  rectangle: {
    width: 415,
    height: 89.39,
    backgroundColor: '#3F1175',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: 30,
    left: 12,
  },
  buttonImage: {
    width: 26,
    height: 22.87,
    tintColor: '#ffffff',
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32.68,
    color: '#ffffff',
  },
  newRectangle: {
    width: 365,
    height: 114,
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 14,
    paddingLeft: 24,
    backgroundColor: '#FE9900',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.33,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    borderRadius: 3,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: 'center',
    gap: 36,
    opacity: 1,
  },
  selectDateText: {
    width: 150,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 1.5,
    textAlign: 'left',
    color: 'white',
    opacity: 1,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newRectangleText: {
    width: 246,
    height: 36,
    fontFamily: 'Roboto',
    fontSize: 34,
    fontWeight: '400',
    lineHeight: 36,
    textAlign: 'left',
    color: 'white',
  },
  iconButton: {
    width: 24,
    height: 24,
    marginLeft: 7,
    left: 24,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  calendarRectangle: {
    width: 365,
    height: 370,
    position: 'absolute',
    top: 224,
    left: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    width: 54.35,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 5,
    right: 5,
    paddingVertical: 5,
  },
  navButton: {
    width: 10.18,
    height: 18,
    right: 35,
  },
  navButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  calendar: {
    width: '90%',
    alignItems: 'center',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -40,
    left: 15,
  },
  monthText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.1,
    textAlign: 'left',
    color: 'black',
  },
  monthButton: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  monthButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  day: {
    width: '14%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  horizontalLine: {
    width: 300,
    height: 0,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: '#0000001C',
    opacity: 1,
    transform: [{ rotate: '-0.19deg' }],
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  dateButton: {
    width: '14%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  selectedDateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
  },
  selectedDateText: {
    color: 'white',
  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: -30,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerButtonText: {
    fontSize: 14,
    color: '#FF9800',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  smallModalContent: {
    width: '50%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  yearButton: {
    paddingVertical: 5,
  },
  yearText: {
    fontSize: 16,
  },
  dropdownContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedDropdownItem: {
    backgroundColor: '#ddd',
  },
  dropdownFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  dropdownFooterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default CalendarScreen;
