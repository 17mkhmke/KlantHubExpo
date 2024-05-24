import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions, StatusBar } from 'react-native';

const Header = ({ screenName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(Dimensions.get('window').width));

  const handleAvatarPress = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    Animated.timing(modalAnimation, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="darkslategray" />
      <View style={styles.leftContainer}>
        <Image source={require('./../../assets/DataBalk Logo White.png')} style={styles.logo} />
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image source={require('./../../assets/Me White.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.screenName}>{screenName}</Text>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        onRequestClose={handleModalClose}
        animationType="none"
      >
        <TouchableOpacity style={styles.modalContainer} onPress={handleModalClose} activeOpacity={1}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateX: modalAnimation }] }]}>
            <View style={styles.modalNameContainer}>
              <Image source={require('./../../assets/Me White.png')} style={styles.modalAvatar} />
              <Text style={styles.modalName}>Mkhuseli Mkeyiya</Text>
            </View>
            <Text style={styles.modalText}>mkhuseli@databalk.nu</Text>
            <Text style={styles.modalText}>Ontwikkler</Text>
            <Text style={styles.modalText}>Tenant wisselen</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#00A7DB',
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // for Android shadow
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 140, 
    height: 34,
    marginRight: 32,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 16,
    marginRight: 8,
  },
  screenName: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
  },
  modalContent: {
    backgroundColor: 'rgba(29, 88, 151, 0.6)',
    padding: 20,
    borderRadius: 10,
    height: height * 0.4,
    width: width * 0.8,
  },
  modalNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
});

export default Header;
