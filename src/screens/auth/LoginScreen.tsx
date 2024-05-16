// import React from 'react';
// import { View, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { authenticate } from './../../../services/authService';

// type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
// };

// type LoginScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'Login'>;
// };

// const LoginScreen: React.FC<LoginScreenProps> = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

//   const handleLogin = async () => {
//     try {
//       const authResult = await authenticate();
//       console.log('Authentication successful:', authResult);

//       navigation.navigate('Home');
//     } catch (error) {
//     }
//   };

//   return (
//     <View>
//       <Button title="Login with Microsoft" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;
