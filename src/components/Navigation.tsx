import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import AfspraakScreen from '../screens/AfsprakenScreen';
import BugsEnWensen from '../screens/bugsenWensenScreen';
import RelatieScreen from './Relatie/RelatieScreen';
import OnboardingScreen from './Kennisbank/KnowledgeArticleDetailScreen';
import ZakenScreen from '../screens/ZakenScreen';
import DetailedViewItem from './BugsenWensen/viewById';
import Header from './Header';
import ProductGrid from './Relatie/RelatieScreen';
import ProductDetails from './Relatie/routekaartQuery';
import KnowledgeArticles from '../screens/knowledgeArticles';
import KnowledgeArticleDetailScreen from './Kennisbank/KnowledgeArticleDetailScreen';
import IncidentDetail from './Zaken/IncidentDetail';
import { RootStackParamList } from './../core/utils/types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

interface TabBarButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  focused: boolean;
  icon: any;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ onPress, focused, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBarButton}>
      {focused && <View style={styles.whiteLine} />}
      <Image source={icon} style={[styles.tabBarIcon, focused && styles.focusedIcon]} />
    </TouchableOpacity>
  );
};

interface NavigationProps {
  user: {
    photoUrl: string;
    name: string;
    email: string;
    role: string;
  };
}

const TabNavigator: React.FC<NavigationProps> = ({ user }) => {
  return (
    <Tab.Navigator
      initialRouteName="Zaken"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00A7DB',
        tabBarInactiveTintColor: '#fff',
      }}
      sceneContainerStyle={{ backgroundColor: '#00A7DB' }}
    >
      <Tab.Screen
        name="Afspraken"
        component={AfspraakScreen}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Afspraken White.png')}
              onPress={() => navigation.navigate('Afspraken')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Bugs en Wensen"
        component={BugsEnWensen}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Bugs en Wensen White.png')}
              onPress={() => navigation.navigate('Bugs en Wensen')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Zaken"
        component={ZakenScreen}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Zaken White.png')}
              onPress={() => navigation.navigate('Zaken')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Routerkaart"
        component={ProductGrid}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Routerkaart White.png')}
              onPress={() => navigation.navigate('Routerkaart')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="KnowledgeArticles"
        component={KnowledgeArticles}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Clips White.png')}
              onPress={() => navigation.navigate('KnowledgeArticles')}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="TabNavigator"
        component={() => <TabNavigator user={user} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailedViewItem"
        component={DetailedViewItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name="KnowledgeArticleDetail"
        component={KnowledgeArticleDetailScreen}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
        })}/>
      <Stack.Screen
        name="IncidentDetail"
        component={IncidentDetail}
        options={({ route }) => ({
          header: () => <Header user={user} />,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#00A7DB',
    height: 82,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarIcon: {
    width: 40,
    height: 40,
    marginTop: 15,
  },
  focusedIcon: {
    width: 50,
    height: 50,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  whiteLine: {
    position: 'absolute',
    bottom: -11.8,
    width: '70%',
    height: 4.5,
    backgroundColor: 'white',
  },
  backgroundIcon: {
    position: 'absolute',
    width: 68,
    height: 68,
  },
});

export default Navigation;
