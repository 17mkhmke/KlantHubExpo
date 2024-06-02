import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import AfspraakScreen from './../screens/HomeScreen';
import LicentieScreen from './Licentie/LicentieScreen';
import RelatieScreen from './Relatie/RelatieScreen';
import OnboardingScreen from './Onboarding/OnboardScreen';
import ZakenScreen from '../screens/ZakenScreen';
import Header from './Header';

const Tab = createBottomTabNavigator();

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
    avatar: string;
    name: string;
    email: string;
    position: string;
  };
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
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
        component={LicentieScreen}
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
        component={RelatieScreen}
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
        name="Clips"
        component={OnboardingScreen}
        options={({ navigation }) => ({
          header: () => <Header user={user} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              icon={require('./../../assets/2. Icons/Clips White.png')}
              onPress={() => navigation.navigate('Clips')}
            />
          ),
        })}
      />
    </Tab.Navigator>
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
