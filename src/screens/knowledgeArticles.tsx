import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { invokeDataBalkRobot, dataBalkRobotEndpoints } from '../../services/dataBalkRobot';
import { LinearGradient } from 'expo-linear-gradient';

const searchIcon = require('./../../assets/2. Icons/Search White.png');

interface KnowledgeArticle {
  knowledgeArticleId: string;
  title: string;
  logoUrl?: string;
  content?: string;
  articlePublicNumber: string;
}

const KnowledgeArticles = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const knowledgeArticles: KnowledgeArticle[] = await invokeDataBalkRobot(
          dataBalkRobotEndpoints.getKnowledgeArticles,
          'GET'
        );
        setArticles(knowledgeArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = articles.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setArticles(filtered);
    } else {
      setArticles(articles);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.topContainer}>
        {!showSearch ? (
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowSearch(true)}>
            <View style={styles.iconContainer}>
              <Image source={searchIcon} style={styles.headerIcon} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
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
        {articles.map((article) => (
          <TouchableOpacity
            key={article.knowledgeArticleId}
            style={styles.card}
            onPress={() => navigation.navigate('KnowledgeArticleDetail', { articlePublicNumber: article.articlePublicNumber })}
          >
            <Text style={styles.title}>{article.title}</Text>
            {article.logoUrl && <Image source={{ uri: article.logoUrl }} style={styles.logo} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  container: {
    padding: 10,
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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default KnowledgeArticles;
