import { RouteProp } from '@react-navigation/native';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export type RootStackParamList = {
  TabNavigator: undefined;
  DetailedViewItem: { itemId: string };
  ProductDetails: { productId: string };
  KnowledgeArticles: undefined;
  KnowledgeArticleDetail: { articlePublicNumber: string };
  IncidentDetail: { incident: { zaaknummer: string } };
};
  
  export type DetailedViewItemRouteProp = RouteProp<RootStackParamList, 'DetailedViewItem'>;