import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { invokeDataBalkRobot, dataBalkRobotEndpoints } from './../../../services/dataBalkRobot';
import * as ImagePicker from 'expo-image-picker';

interface Incident {
  onderwerp: string;
  beschrijving: string;
  prioriteit: string;
  type: string;
  uwKenmerk: string;
  reproduceerbaar: boolean;
  license: string;
}

interface ZakenFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: (formData: Incident) => void;
}

const priorityOptions = [
  { label: 'Kritiek', value: '799880000' },
  { label: 'Hoog', value: '1' },
  { label: 'Normaal', value: '2' },
  { label: 'Laag', value: '3' },
];

const typeOptions = [
  { label: 'Incident', value: '564710000' },
  { label: 'Verzoek', value: '564710001' },
];

const licenseOptions = [
  { label: 'GRIP', value: '1ae75dfb-da49-ee11-be6e-000d3aaae30e' },
];

const ZakenForm: React.FC<ZakenFormProps> = ({
  visible,
  setVisible,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Incident>({
    onderwerp: '',
    beschrijving: '',
    prioriteit: '2',
    type: '',
    uwKenmerk: '',
    reproduceerbaar: true, 
    license: '1ae75dfb-da49-ee11-be6e-000d3aaae30e', 
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);

  const handleInputChange = (key: keyof Incident, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setErrorText('');

    if (formData.onderwerp === '' || formData.type === '' || formData.beschrijving === '' || formData.prioriteit === '') {
      return setErrorText('Zorg ervoor dat onderwerp, type en beschrijving zijn ingevuld');
    }

    setLoading(true);
    try {
      const endpoint = dataBalkRobotEndpoints.postZaak;
      console.log('Submitting form data to:', endpoint);

      const payload = {
        title: formData.onderwerp,
        description: formData.beschrijving,
        customerId: "fdabf763-eb00-ec11-94ef-000d3a493499",
        crmUserId: "00000000-0000-0000-0000-000000000000",
        licentie: formData.license,
        type: formData.type,
        fibo: 564710001, 
        prioriteit: parseInt(formData.prioriteit, 10),
        reproduceerbaar: formData.reproduceerbaar ? 799880000 : 799880001,
        kenmerkKlant: formData.uwKenmerk,
      };

      console.log('Payload:', JSON.stringify(payload));

      const response = await invokeDataBalkRobot(endpoint, 'POST', payload);

      console.log('Case created successfully:', response);
      Alert.alert('Success', 'Case created successfully!');
      onSubmit(formData);

      setFormData({
        onderwerp: '',
        beschrijving: '',
        prioriteit: '2',
        type: '',
        uwKenmerk: '',
        reproduceerbaar: true,
        license: '1ae75dfb-da49-ee11-be6e-000d3aaae30e', 
      });
      setVisible(false);
    } catch (error: any) {
      console.error('Error during form submission:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create case';
      Alert.alert('Error', `Failed to create case. Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImages([...images, pickerResult]);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Maak Zaak</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            {errorText ? (
              <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Onderwerp*</Text>
              <TextInput
                style={styles.input}
                placeholder="Type here..."
                placeholderTextColor="white"
                onChangeText={(text) => handleInputChange('onderwerp', text)}
                value={formData.onderwerp}
                maxLength={100}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Beschrijving*</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Type here..."
                placeholderTextColor="white"
                onChangeText={(text) => handleInputChange('beschrijving', text)}
                value={formData.beschrijving}
                multiline
                maxLength={10000}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prioriteit*</Text>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('prioriteit', value)}
                items={priorityOptions}
                style={pickerSelectStyles}
                value={formData.prioriteit}
                useNativeAndroidPickerStyle={false} 
                Icon={() => {
                  return <Text style={pickerSelectStyles.icon}>▼</Text>;
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type*</Text>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('type', value)}
                items={typeOptions}
                style={pickerSelectStyles}
                value={formData.type}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <Text style={pickerSelectStyles.icon}>▼</Text>;
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Licentie*</Text>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('license', value)}
                items={licenseOptions}
                style={pickerSelectStyles}
                value={formData.license}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <Text style={pickerSelectStyles.icon}>▼</Text>; 
                }}
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
                maxLength={25}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Reproduceerbaar:</Text>
              <CheckBox
                checked={formData.reproduceerbaar}
                onPress={() =>
                  handleInputChange('reproduceerbaar', !formData.reproduceerbaar)
                }
                containerStyle={styles.checkbox}
                textStyle={{ color: 'white' }}
              />
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
              <Text style={styles.uploadButtonText}>Upload hier</Text>
            </TouchableOpacity>
            <Button title={loading ? 'Bezig...' : 'Indienen'} onPress={handleSubmit} color="black" disabled={loading} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
  },
  scrollContainer: {
    width: '100%', 
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: 'rgba(29, 88, 151, 0.8)',
    borderRadius: 10,
    padding: 20,
    width: 400, 
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
    marginBottom: 15,
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
  multilineInput: {
    height: 80,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    paddingRight: 30, 
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    paddingRight: 30, 
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontSize: 16,
    color: 'white',
  },
});

export default ZakenForm;
