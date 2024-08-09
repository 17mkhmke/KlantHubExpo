import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { invokeDataBalkRobot, dataBalkRobotEndpoints } from '../../../services/dataBalkRobot';
import { LinearGradient } from 'expo-linear-gradient';

interface KnowledgeArticleDetail {
  title: string;
  logoUrl?: string;
  content: string;
}

const stripHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

const KnowledgeArticleDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { articlePublicNumber } = route.params as { articlePublicNumber: string };
  const [knowledgeArticle, setKnowledgeArticle] = useState<KnowledgeArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const article = await invokeDataBalkRobot<KnowledgeArticleDetail>(
        `${dataBalkRobotEndpoints.getKnowledgeArticle}${articlePublicNumber}`,
        'GET'
      );
      if (article) {
        article.content = stripHtmlTags(article.content);
      }
      setKnowledgeArticle(article);
    } catch (error) {
      console.error('Error fetching article details:', error);
    } finally {
      setLoading(false);
    }
  }, [articlePublicNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentBox}>
          <Text style={styles.title}>{knowledgeArticle?.title}</Text>
          {knowledgeArticle?.logoUrl && <Image source={{ uri: knowledgeArticle.logoUrl }} style={styles.logo} />}
            <Text>{knowledgeArticle?.content}</Text>
          </View>
        </ScrollView>
      </View>
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
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default KnowledgeArticleDetailScreen;
