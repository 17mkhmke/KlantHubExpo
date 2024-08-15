import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal } from 'react-native';

interface FilterComponentProps {
  onClose: () => void;
  onFilterChange: (inDeWacht: boolean) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onClose, onFilterChange }) => {
  const [verzoekChecked, setVerzoekChecked] = useState(false);
  const [insidentChecked, setInsidentChecked] = useState(false);
  const [kritiekChecked, setKritiekChecked] = useState(false);
  const [hoogChecked, setHoogChecked] = useState(false);
  const [normaalChecked, setNormaalChecked] = useState(false);
  const [laagChecked, setLaagChecked] = useState(false);
  const [nieuwChecked, setNieuwChecked] = useState(false);
  const [inBehandelingChecked, setInBehandelingChecked] = useState(false);
  const [gereedChecked, setGereedChecked] = useState(false);
  const [inDeWacht, setInDeWacht] = useState(false);

  const handleSwitchChange = (value: boolean) => {
    setInDeWacht(value);
    onFilterChange(value); // Notify the parent component of the change
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setVerzoekChecked(!verzoekChecked)} style={styles.checkbox}>
              {verzoekChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Verzoek</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setInsidentChecked(!insidentChecked)} style={styles.checkbox}>
              {insidentChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Incident</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prioriteit</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setKritiekChecked(!kritiekChecked)} style={styles.checkbox}>
              {kritiekChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Kritiek</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setHoogChecked(!hoogChecked)} style={styles.checkbox}>
              {hoogChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Hoog</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setNormaalChecked(!normaalChecked)} style={styles.checkbox}>
              {normaalChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Normaal</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setLaagChecked(!laagChecked)} style={styles.checkbox}>
              {laagChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Laag</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setNieuwChecked(!nieuwChecked)} style={styles.checkbox}>
              {nieuwChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Nieuw</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setInBehandelingChecked(!inBehandelingChecked)} style={styles.checkbox}>
              {inBehandelingChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>In behandeling</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setGereedChecked(!gereedChecked)} style={styles.checkbox}>
              {gereedChecked && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Gereed</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={inDeWacht}
              onValueChange={handleSwitchChange}
              trackColor={{ true: '#1D589789', false: '#CCCCCC' }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.switchLabel}>{inDeWacht ? 'Ja' : 'Nee'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Indienen</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
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
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: 'white',
    marginLeft: 10,
  },
  submitButton: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
  },
  submitButtonText: {},
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    top: 35,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
  },
  dateText: {
    color: 'black',
  },
});

export default FilterComponent;
