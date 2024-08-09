import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

// Define a type for the filter keys
type FilterKey = 'verzoek' | 'insident' | 'kritiek' | 'hoog';

interface AfsprakenFilterProps {
  filters: Record<FilterKey, boolean>; // Use Record with FilterKey for filters
  onFilterChange: (filters: Record<FilterKey, boolean>) => void; // Correct typing for onFilterChange
  onSubmit: () => void;
  onClose: () => void;
}

const AfsprakenFilter: React.FC<AfsprakenFilterProps> = ({
  filters,
  onFilterChange,
  onSubmit,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Use FilterKey type for the key parameter
  const handleCheckboxChange = (key: FilterKey) => {
    setLocalFilters({ ...localFilters, [key]: !localFilters[key] });
  };

  const handleSubmit = () => {
    onFilterChange(localFilters);
    onSubmit();
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Type</Text>
          <View style={styles.section}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => handleCheckboxChange('verzoek')}
                style={styles.checkbox}
              >
                {localFilters.verzoek && <View style={styles.checkmark} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Service</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => handleCheckboxChange('insident')}
                style={styles.checkbox}
              >
                {localFilters.insident && <View style={styles.checkmark} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Onboarding</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => handleCheckboxChange('kritiek')}
                style={styles.checkbox}
              >
                {localFilters.kritiek && <View style={styles.checkmark} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Ontwikkeling</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => handleCheckboxChange('hoog')}
                style={styles.checkbox}
              >
                {localFilters.hoog && <View style={styles.checkmark} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Management</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Indienen</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29, 88, 151, 0.8)',
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 55,
    right: 18,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#006098',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AfsprakenFilter;
