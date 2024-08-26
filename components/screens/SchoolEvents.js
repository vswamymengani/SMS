import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from 'react-native';

const SchoolEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://18.60.190.183:3000/events/media');
        const data = await response.json();
        
        console.log('Fetched media data:', data); // Log the data to check its structure
        
        // Ensure data is not undefined and has the expected structure
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        const groupedData = data.reduce((acc, item) => {
          if (!item.event_id) {
            console.error('Missing event_id for item:', item);
            return acc;
          }
          if (!acc[item.event_id]) {
            acc[item.event_id] = {
              description: item.description,
              media: [],
            };
          }
          acc[item.event_id].media.push(item);
          return acc;
        }, {});

        setEvents(Object.entries(groupedData).map(([event_id, eventData]) => ({
          event_id,
          ...eventData,
        })));
      } catch (error) {
        console.error('Failed to fetch media data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderMediaItem = ({ item }) => (
    <View style={styles.mediaContainer}>
      {item.media_type.startsWith('image') ? (
        <Image 
          source={{ uri: item.media_url }} 
          style={styles.image} 
        />
      ) : (
        <Text style={styles.videoText}>Video: {item.media_url.split('/').pop()}</Text>
      )}
    </View>
  );

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventDescription}>
        {item.description}
      </Text>
      <FlatList
        data={item.media}
        keyExtractor={(mediaItem) => mediaItem.media_id.toString()}
        renderItem={renderMediaItem}
        contentContainerStyle={styles.mediaList}
      />
    </View>
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.event_id.toString()}
      renderItem={renderEvent}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  eventContainer: {
    marginBottom: 24,
  },
  eventDescription: {
    fontSize: 18,
    marginBottom: 8,
  },
  mediaList: {
    paddingBottom: 16,
  },
  mediaContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  videoText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SchoolEvents;
