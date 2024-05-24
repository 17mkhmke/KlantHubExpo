import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AfspraakScreen from './../screens/HomeScreen';
import LicentieScreen from './Licentie/LicentieScreen';
import RelatieScreen from './Relatie/RelatieScreen';
import OnboardingScreen from './Onboarding/OnboardScreen';
import ZakenScreen from '../screens/ZakenScreen';
import Header from './Header';
import { StyleSheet, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';

const Tab = createBottomTabNavigator();

interface TabBarButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  focused: boolean;
  icon: any;
  activeIcon: any;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ onPress, focused, icon, activeIcon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBarButton}>
      {focused && (
        <Image source={require('./../../assets/2. Icons/Shape White.png')} style={styles.backgroundIcon} />
      )}
      <Image source={focused ? activeIcon : icon} style={[styles.tabBarIcon, { tintColor: focused ? '#00A7DB' : '#fff' }]} />
    </TouchableOpacity>
  );
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
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
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused }) => (
              <TabBarButton 
                focused={focused} 
                icon={require('./../../assets/2. Icons/Afspraken White.png')} 
                activeIcon={require('./../../assets/2. Icons/Afspraken Blue.png')} 
                onPress={() => {}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bugs en Wensen"
          component={LicentieScreen}
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused }) => (
              <TabBarButton 
                focused={focused} 
                icon={require('./../../assets/2. Icons/Bugs en Wensen White.png')} 
                activeIcon={require('./../../assets/2. Icons/Bugs en Wensen Blue.png')} 
                onPress={() => {}}
              />
            ),
          }}
        />
                <Tab.Screen
          name="Zaken"
          component={ZakenScreen}
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused }) => (
              <TabBarButton 
                focused={focused} 
                icon={require('./../../assets/2. Icons/Zaken White.png')} 
                activeIcon={require('./../../assets/2. Icons/Zaken Blue.png')} 
                onPress={() => {}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Routerkaart"
          component={RelatieScreen}
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused }) => (
              <TabBarButton 
                focused={focused} 
                icon={require('./../../assets/2. Icons/Routerkaart White.png')} 
                activeIcon={require('./../../assets/2. Icons/Relatie Blue.png')} 
                onPress={() => {}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Clips"
          component={OnboardingScreen}
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused }) => (
              <TabBarButton 
                focused={focused} 
                icon={require('./../../assets/2. Icons/Clips White.png')} 
                activeIcon={require('./../../assets/2. Icons/Onboarding Blue.png')} 
                onPress={() => {}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
    width: 42,
    height: 42,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundIcon: {
    position: 'absolute',
    width: 68,
    height: 68,
  },
});

export default Navigation;