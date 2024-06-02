import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Modal, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AfsprakenFilter = ({ onClose }) => {
  const [verzoekChecked, setVerzoekChecked] = useState(false);
  const [insidentChecked, setInsidentChecked] = useState(false);
  const [kritiekChecked, setKritiekChecked] = useState(false);
  const [hoogChecked, setHoogChecked] = useState(false);
  const [normaalChecked, setNormaalChecked] = useState(false);
  const [laagChecked, setLaagChecked] = useState(false);
  const [nieuwChecked, setNieuwChecked] = useState(false);
  const [inBehandelingChecked, setInBehandelingChecked] = useState(false);
  const [gereedChecked, setGereedChecked] = useState(false);
  const [melder, setMelder] = useState(null);
  const [melderOpen, setMelderOpen] = useState(false);
  const [melderItems, setMelderItems] = useState([
    { label: 'Jos Balk', value: 'jos_balk' },
    { label: 'Martine Naiber', value: 'john_doe' },
  ]);
  const [gemaaktOp, setGemaaktOp] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inDeWacht, setInDeWacht] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || gemaaktOp;
    setShowDatePicker(Platform.OS === 'ios');
    setGemaaktOp(currentDate);
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
    <View style={styles.container}>
         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Type</Text>
      <View style={styles.section}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setVerzoekChecked(!verzoekChecked)} style={styles.checkbox}>
            {verzoekChecked && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Service</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setInsidentChecked(!insidentChecked)} style={styles.checkbox}>
            {insidentChecked && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Onboarding</Text>
        </View>
      </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setKritiekChecked(!kritiekChecked)} style={styles.checkbox}>
            {kritiekChecked && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Ontwikkeling</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setHoogChecked(!hoogChecked)} style={styles.checkbox}>
            {hoogChecked && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Management</Text>
        </View>
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
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 20,
  },

  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 55,
    right: 18,
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
export default AfsprakenFilter;