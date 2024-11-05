import React from 'react';
import CameraScreen from './screens/CameraScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './screens/Menu';
import GalleryScreen from './screens/GalleryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Menu" 
          component={Menu}
          options={{ headerShown: false }} />
          <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{ headerShown: false }} />
          <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}