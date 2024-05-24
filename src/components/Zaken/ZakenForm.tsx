import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

interface ZakenFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (formData: any) => void;
}

const ZakenForm: React.FC<ZakenFormProps> = ({ visible, setVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    onderwerp: '',
    beschrijving: '',
    prioriteit: '',
    type: '',
    uwKenmerk: '',
    reproduceerbaar: false,
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      onderwerp: '',
      beschrijving: '',
      prioriteit: '',
      type: '',
      uwKenmerk: '',
      reproduceerbaar: false,
    });
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Maak Zaak</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Onderwerp*</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="white"
              onChangeText={(text) => handleInputChange('onderwerp', text)}
              value={formData.onderwerp}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Beschrijving*</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="white"
              onChangeText={(text) => handleInputChange('beschrijving', text)}
              value={formData.beschrijving}
              multiline
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Prioriteit*</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              onValueChange={(value) => handleInputChange('prioriteit', value.toString())}
              value={parseInt(formData.prioriteit, 10) || 0}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type*</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="white"
              onChangeText={(text) => handleInputChange('type', text)}
              value={formData.type}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Uw Kenmerk*</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor="white"
              onChangeText={(text) => handleInputChange('uwKenmerk', text)}
              value={formData.uwKenmerk}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Reproduceerbaar:</Text>
            <CheckBox
              checked={formData.reproduceerbaar}
              onPress={() => handleInputChange('reproduceerbaar', !formData.reproduceerbaar)}
              containerStyle={styles.checkbox}
              textStyle={{ color: 'white' }}
            />
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload hier</Text>
          </TouchableOpacity>
          <Button title="Indienen" onPress={handleSubmit} color="#1D5897" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 88, 151, 0.6)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'rgba(29, 88, 151, 0.6)', // Same background color as overlay
    borderRadius: 10,
    padding: 20,
    height: '90%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginRight: 10,
    color: 'white',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'white',
  },
  uploadButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    textAlign: 'center',
    color: '#1D5897',
  },
});

export default ZakenForm;
