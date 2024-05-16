// ZakenForm.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';

interface ZakenFormProps {
  onSubmit: (formData: any) => void;
}

const ZakenForm: React.FC<ZakenFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    gemaaktOp: '',
    licentie: '',
    prioriteit: '',
    fibo: '',
    inDeWacht: '',
    melder: '',
    onderwerp: '',
  });
  const [visible, setVisible] = useState(false); // Start with modal closed

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    // Reset form data after submission
    setFormData({
      type: '',
      gemaaktOp: '',
      licentie: '',
      prioriteit: '',
      fibo: '',
      inDeWacht: '',
      melder: '',
      onderwerp: '',
    });
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log('Form visibility:', visible);
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Add Zaken Item</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type"
            onChangeText={(text) => handleInputChange('type', text)}
            value={formData.type}
          />
          <TextInput
            style={styles.input}
            placeholder="Gemaakt op"
            onChangeText={(text) => handleInputChange('gemaaktOp', text)}
            value={formData.gemaaktOp}
          />
          <TextInput
            style={styles.input}
            placeholder="Licentie"
            onChangeText={(text) => handleInputChange('licentie', text)}
            value={formData.licentie}
          />
          <TextInput
            style={styles.input}
            placeholder="Prioriteit"
            onChangeText={(text) => handleInputChange('prioriteit', text)}
            value={formData.prioriteit}
          />
          <TextInput
            style={styles.input}
            placeholder="Onderwerp"
            onChangeText={(text) => handleInputChange('onderwerp', text)}
            value={formData.onderwerp}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
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
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ZakenForm;
