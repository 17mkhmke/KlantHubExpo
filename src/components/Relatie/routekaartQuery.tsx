import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { invokeTicketProxy, ticketProxyEndpoints } from '../../../services/ticketProxy'; 

interface WorkItemResponse {
  workItems: WorkItem[];
}

const ProductDetails = ({ route }) => {
  const { routeKaartQueryId } = route.params;
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        const data: WorkItemResponse = await invokeTicketProxy(ticketProxyEndpoints.getDevOpsCase, 'GET', {
          queryId: routeKaartQueryId,
        });
        setWorkItems(data.workItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkItems();
  }, [routeKaartQueryId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {workItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          {/* Add more fields as needed */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProductDetails;
