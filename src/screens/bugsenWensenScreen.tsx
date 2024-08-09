import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native';
import { invokeTicketProxy, ticketProxyEndpoints } from './../../services/ticketProxy';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkItem, DevOpsQuery } from '../core/utils/interfaces';
import { licenties } from '../core/utils/licentie';
import { useNavigation } from '@react-navigation/native';
import FilterComponent from '../components/BugsenWensen/BugsnWensenFilter';

// Helper Functions
const getLicentieLogo = (path: string): string | undefined => {
  const cleanedPath = path.replace(/^Debatic\\/, '');
  const matchedLicentie = licenties.find(licentie =>
    cleanedPath.toLowerCase().includes(licentie.devopsPath.toLowerCase())
  );
  return matchedLicentie?.logo;
};

const getWaveFromFullIteration = (fullIteration: string): string => {
  const match = fullIteration.match(/Wave \d+-\d+/);
  return match ? match[0] : fullIteration;
};

const truncateTitle = (title: string, length: number = 35): string => {
  if (title.length > length) {
    return `${title.substring(0, length)}...`;
  }
  return title;
};

const searchIcon = require('./../../assets/2. Icons/Search White.png');
const filterIcon = require('./../../assets/2. Icons/Filter White.png');

const BugsnWensencard = ({ data, navigation }: { data: WorkItem, navigation: any }) => {
  // const logo = getLicentieLogo(data.path);
  const bugIcon = require('./../../assets/2. Icons/Bug.png');
  const wensenIcon = require('./../../assets/2. Icons/Wensen.png');
  const typeIcon = data.type === 'Bug' ? bugIcon : wensenIcon;

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailedViewItem', { itemId: data.id })}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <Text style={styles.title}>{truncateTitle(data.title)}</Text>
          <View style={styles.infoRow}>
            <Image source={typeIcon} style={styles.typeIcon} />
            <Text style={styles.infoText}># {data.id}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{data.fibo}</Text>
            </View>
            <Text style={styles.labelText}>Versie: <Text style={styles.normalText}>{getWaveFromFullIteration(data.fullIteration)}</Text></Text>
            <Text style={styles.labelText}>Sprint: <Text style={styles.normalText}>{data.iteration}</Text></Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BugsEnWensen = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredItems, setFilteredItems] = useState<WorkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const slideAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: DevOpsQuery = await invokeTicketProxy<DevOpsQuery>(ticketProxyEndpoints.getQuery + 'ef21a860-0237-4e89-a1e7-2dd049859a84', "GET");
        setWorkItems(query.workItems);
        setFilteredItems(query.workItems); 
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilter = (filterData: { isOpen: boolean; showBugs: boolean; showWensen: boolean }) => {
    const { isOpen, showBugs, showWensen } = filterData;

    const filtered = workItems.filter(item => {
      if (isOpen && item.state !== 'Open') return false;
      if (!showBugs && item.type === 'Bug') return false;
      if (!showWensen && item.type === 'Product Backlog Item') return false;
      return true;
    });

    setFilteredItems(filtered);
  };

  const openFilter = () => {
    setShowFilter(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowFilter(false));
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = workItems.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setFilteredItems(filtered);
    } else {
      setFilteredItems(workItems);
    }
  };

  if (loading) {
    return <Text style={styles.loader}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.topContainer}>
        {!showSearch ? (
          <>
            <TouchableOpacity style={styles.headerButton} onPress={openFilter}>
              <View style={styles.iconContainer}>
                <Image source={filterIcon} style={styles.headerIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => setShowSearch(true)}>
              <View style={styles.iconContainer}>
                <Image source={searchIcon} style={styles.headerIcon} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Zoek..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <Text style={styles.closeSearch}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredItems.map((data) => (
          <BugsnWensencard key={data.id} data={data} navigation={navigation} />
        ))}
      </ScrollView>
      {showFilter && (
        <Animated.View style={[styles.filterWrapper, { transform: [{ translateX: slideAnim }] }]}>
          <FilterComponent
            applyFilter={applyFilter}
            closeFilter={closeFilter}
          />
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
  },
  container: {
    padding: 10,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  infoText: {
    marginRight: 10,
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  loader: {
    color: 'white'
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 11.5
  },
  typeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  topContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
  },
  badge: {
    backgroundColor: '#004880',
    borderRadius: 15, 
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
    zIndex: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  closeSearch: {
    fontSize: 20,
    color: 'gray',
    paddingLeft: 10,
  },
});

export default BugsEnWensen;