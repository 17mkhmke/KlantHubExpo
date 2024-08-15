import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AfsprakenCards from '../components/Afspraken/AfsprakenCard';
import AfsprakenFilter from '../components/Afspraken/AfsprakenFilter';

const searchIcon = require('./../../assets/2. Icons/Search White.png');
const filterIcon = require('./../../assets/2. Icons/Filter White.png');

// Define a type for the filters object
interface Filters {
  verzoek: boolean;
  insident: boolean;
  kritiek: boolean;
  hoog: boolean;
}

const AfsprakenScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    verzoek: false,
    insident: false,
    kritiek: false,
    hoog: false,
  });

  const handleSearchIconClick = () => {
    setIsSearchMode(true);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchMode(false);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleFilterSubmit = () => {
    setShowFilter(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />
      <View style={styles.topContainer}>
        {isSearchMode ? (
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearchChange} // Typing issue fixed here
              placeholder="Search..."
              placeholderTextColor="#666"
              autoFocus
            />
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.headerButton} onPress={handleSearchIconClick}>
              <View style={styles.iconContainer}>
                <Image source={searchIcon} style={styles.headerIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.headerButton}>
              <View style={styles.iconContainer}>
                <Image source={filterIcon} style={styles.headerIcon} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <AfsprakenCards searchQuery={searchQuery} filters={filters} />
      {showFilter && (
        <AfsprakenFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleFilterSubmit}
          onClose={() => setShowFilter(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingTop: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: 'black',
  },
  clearButton: {
    marginLeft: 10,
    padding: 5,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#666',
  },
});

export default AfsprakenScreen;
