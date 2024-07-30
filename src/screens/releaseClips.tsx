import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';

const dummyData = [
  { id: '1', title: 'IRIS | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110140', logo: require('../../assets/Product Logo/7. IRIS.png') },
  { id: '2', title: 'Datalaag | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110116', logo: require('../../assets/1. Embleem PNGs/0.2 DataLaag.png') },
  { id: '3', title: 'IRIS CRM | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110140', logo: require('../../assets/Product Logo/IRIS CRM.png') },
  { id: '4', title: 'Vastgoedtabel | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11105336', logo: require('../../assets/Product Logo/Vastgoedtabel.png') },
  { id: '5', title: 'Onderhoudsketen | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110150', logo: require('../../assets/1. Embleem PNGs/1.2 Onderhoudsketen.png') },
  { id: '6', title: 'Inspectic | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110152', logo: require('../../assets/Product Logo/Inspectic.png') },
  { id: '7', title: 'IRIS CMS | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110159', logo: require('../../assets/Product Logo/IRIS CMS.png') },
  { id: '8', title: 'IRIS Incaso | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110165', logo: require('../../assets/1. Embleem PNGs/2.3 IRIS Incasso.png') },
  { id: '9', title: 'IRIS Field | Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110168', logo: require('../../assets/1. Embleem PNGs/2.4 IRIS Field.png') },
  { id: '10', title: 'IRIS Contracbeheer| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110177', logo: require('../../assets/1. Embleem PNGs/2.5 IRIS Contractbeheer.png') },
  { id: '11', title: 'IRIS Projecten| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110182', logo: require('../../assets/1. Embleem PNGs/2.6 IRIS Projecten.png') },
  { id: '12', title: 'GRIP| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/Woonmatch.png') },
  { id: '13', title: 'Woonmatch| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/Woonmatch.png') },
  // { id: '14', title: 'Woningruilen| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/7. IRIS.png') },
  { id: '15', title: 'Radar| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/1. Embleem PNGs/4.1 Radar.png') },
  // { id: '16', title: 'BI Portaal| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/7. IRIS.png') },
  // { id: '17', title: 'GRIP| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/7. IRIS.png') },
  // { id: '18', title: 'GRIP| Releasenotes', videoUrl: 'https://vimeo.com/showcase/11110184', logo: require('../../assets/Product Logo/7. IRIS.png') },
];

const VideosScreen = () => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handlePress = (id) => {
    setExpandedItemId(prevId => (prevId === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isExpanded = item.id === expandedItemId;

    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
         
        <View style={[styles.itemContainer, isExpanded && styles.expandedItem]}>
          <View style={styles.itemContent}>
            <Image source={item.logo} style={styles.logo} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.title}</Text>
              {isExpanded && (
                <WebView 
                  source={{ uri: item.videoUrl }} 
                  style={styles.webView}
                  allowsInlineMediaPlayback
                />
              )}
            </View>
          </View>
          {isExpanded && (
            <TouchableOpacity style={styles.minimizeButton} onPress={() => handlePress(null)}>
              <Text style={styles.minimizeButtonText}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
  
  },
  expandedItem: {
    backgroundColor: '#f0f0f0',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  webView: {
    marginTop: 8,
    height: 200,
  },
  minimizeButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  minimizeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default VideosScreen;
