import { RouteProp } from '@react-navigation/native';
import { Incident } from './interfaces';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export type RootStackParamList = {
  TabNavigator: undefined;
  DetailedViewItem: { itemId: string };
  ProductDetails: { productId: string };
  KnowledgeArticles: undefined;
  KnowledgeArticleDetail: { articlePublicNumber: string };
  IncidentDetail: { incident: Incident };
};

export type DetailedViewItemRouteProp = RouteProp<RootStackParamList, 'DetailedViewItem'>;
export type IncidentDetailRouteProp = RouteProp<RootStackParamList, 'IncidentDetail'>;
