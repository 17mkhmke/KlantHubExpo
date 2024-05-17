import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../screens/HomeScreen';
import ServiceScreen from './(services)/ServiceScreen';
import LicentieScreen from './Licentie/LicentieScreen';
import RelatieScreen from './Relatie/RelatieScreen';
import OnboardingScreen from './Onboarding/OnboardScreen';
import Header from './Header';
import { StyleSheet, Image, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

const Tab = createBottomTabNavigator();
interface TabBarButtonProps {
  onPress: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void;
  children?: React.ReactNode;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBarButton}>
      {children}
    </TouchableOpacity>
  );
};
const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#00A7DB',
          tabBarInactiveTintColor: '#fff',
        }}
        sceneContainerStyle={{ backgroundColor: '#00A7DB' }}
      >
       <Tab.Screen
          name="Services"
          component={ServiceScreen}
          options={({ route }) => ({
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? require('./../../assets/2. Icons/Service Blue.png') : require('./../../assets/ServiceIcon.png')} style={[styles.tabBarIcon, { tintColor: color }]} />
            ),
            tabBarButton: ({ onPress }) => (
              <TabBarButton onPress={onPress}>
                <Image source={require('./../../assets/ServiceIcon.png')} style={[styles.tabBarIcon, { tintColor: '#fff' }]} />
                <Text style={[styles.tabBarLabel, { color: '#fff' }]}>Services</Text>
              </TabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Licentie"
          component={LicentieScreen}
          options={({ route }) => ({
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? require('./../../assets/2. Icons/Licentie Blue.png') : require('./../../assets/2. Icons/Licentie White.png')} style={[styles.tabBarIcon, { tintColor: color }]} />
            ),
            tabBarButton: ({ onPress }) => (
              <TabBarButton onPress={onPress}>
                <Image source={require('./../../assets/2. Icons/Licentie White.png')} style={[styles.tabBarIcon, { tintColor: '#fff' }]} />
                <Text style={[styles.tabBarLabel, { color: '#fff' }]}>Licentie</Text>
              </TabBarButton>
            ),
          })}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ color, size }) => (
              <Image source={require('./../../assets/DataBalk Embleem.png')}
                style={[styles.tabBarIcon, { width: 80, height: 80, marginTop: 18 }]}
              />
            ),
            tabBarLabel: '',
            unmountOnBlur: true
          }}
        />
        <Tab.Screen
          name="Relatie"
          component={RelatieScreen}
          options={({ route }) => ({
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={focused ? require('./../../assets/2. Icons/Relatie Blue.png') : require('./../../assets/2. Icons/Relatie White.png')}
                style={[styles.tabBarIcon, { tintColor: color }]}
              />
            ),
            tabBarButton: ({ onPress }) => (
              <TabBarButton onPress={onPress}>
                <Image source={require('./../../assets/2. Icons/Relatie White.png')} style={[styles.tabBarIcon, { tintColor: '#fff' }]} />
                <Text style={[styles.tabBarLabel, { color: '#fff' }]}>Services</Text>
              </TabBarButton>
            ),
          })}
        />
              <Tab.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={({ route }) => ({
            header: () => <Header screenName={undefined} />,
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={focused ? require('./../../assets/2. Icons/Onboarding Blue.png') : require('./../../assets/2. Icons/Onboarding White.png')} style={[styles.tabBarIcon, { tintColor: color }]} />
            ),
            tabBarButton: ({ onPress }) => (
              <TabBarButton onPress={onPress}>
                <Image source={require('./../../assets/2. Icons/Onboarding White.png')} style={[styles.tabBarIcon, { tintColor: '#fff' }]} />
                <Text style={[styles.tabBarLabel, { color: '#fff' }]}>Onboarding</Text>
              </TabBarButton>
            ),
          })}
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
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarIcon: {
    width: 34,
    height: 34,
  },
  tabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  tabBarButtonFocused: {
    backgroundColor: '#fff',
    transform: [{ rotate: '120deg' }],
  },
});

export default Navigation;
