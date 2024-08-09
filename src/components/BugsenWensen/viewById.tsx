// viewById.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkItem } from '../../core/utils/interfaces';
import { invokeTicketProxy, ticketProxyEndpoints } from '../../../services/ticketProxy';
import { useNavigation, useRoute } from '@react-navigation/native';
import SplashScreen from '../../screens/SplashScreen';
import { DetailedViewItemRouteProp } from './../../core/utils/types'; 

const removeHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const formatDateDutch = (dateString: string) => {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const getBadgeColor = (state: string) => {
  switch (state) {
    case 'Approved':
      return 'rgb(178, 178, 178)';
    case 'To Do':
      return 'rgb(141, 197, 75)';
    case 'Committed':
      return 'rgb(0, 122, 204)';
    case 'In Progress':
      return 'rgb(41, 46, 107)';
    case 'On Hold':
      return 'rgb(240, 102, 115)';
    case 'Test':
      return 'rgb(0, 156, 204)';
    case 'Done':
      return 'rgb(51, 153, 51)';
    default:
      return 'rgb(178, 178, 178)';
  }
};

const DetailedViewItem: React.FC = () => {
  const route = useRoute<DetailedViewItemRouteProp>(); // Use the route hook with the correct type
  const { itemId } = route.params; // Extract itemId from route params
  const [item, setItem] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: WorkItem = await invokeTicketProxy<WorkItem>(`${ticketProxyEndpoints.getDevOpsCase}/${itemId}`, "GET");
        setItem(query);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (loading) {
    return <SplashScreen />;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  if (!item) {
    return <Text>No data found</Text>;
  }

  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Bug/Wensen No.*</Text>
            <View style={[styles.badge, { backgroundColor: getBadgeColor(item.state) }]} />
            <Text style={styles.stateText}>{item.state}</Text>
          </View>
          <TextInput style={styles.input} value={item.id.toString()} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Onderwerp*</Text>
          <TextInput style={styles.input} value={removeHtmlTags(item.title)} editable={false} multiline />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Behandelaar*</Text>
          <View style={styles.handler}>
            <Image source={{ uri: item.assignedTo?.imageUrl ?? '' }} style={styles.avatar} />
            <Text style={styles.handlerName}>{item.assignedTo?.displayName ?? 'Unassigned'}</Text>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Beschrijving*</Text>
          <TextInput style={styles.input} value={removeHtmlTags(item.description ?? '')} editable={false} multiline />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Releasenotes*</Text>
          <TextInput style={styles.input} value={removeHtmlTags(item.releaseNotes ?? '')} editable={false} multiline />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Iteration*</Text>
          <TextInput style={styles.input} value={item.fullIteration} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product*</Text>
          <TextInput style={styles.input} value={item.path} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fibo*</Text>
          <TextInput style={styles.input} value={item.fibo.toString()} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gemd Door*</Text>
          <TextInput style={styles.input} value={item.reporter ?? 'Unknown'} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aanmaak Datum*</Text>
          <View style={styles.dateInputContainer}>
            <TextInput style={[styles.input, styles.dateInput]} value={formatDateDutch(item.created)} editable={false} />
            <Image source={require('../../../assets/2. Icons/Afspraken White.png')} style={styles.calendarIcon} />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL Testmonitor*</Text>
          <TextInput style={styles.input} value={item.testMonitor ?? ''} editable={false} multiline />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    flex: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dateInput: {
    flex: 1,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
  },
  handler: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  handlerName: {
    color: 'white',
  },
  loader: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stateText: {
    color: 'white',
    marginRight: 75,
    fontWeight: 'bold',
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 88,
  },
});

export default DetailedViewItem;
