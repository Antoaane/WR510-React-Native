import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import PokeView from './views/PokeView';
import MyTabs from './views/components/BottomNav';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="PokeList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Tabs" 
          component={MyTabs}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
        />
        <Stack.Screen name="PokeView" component={PokeView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;