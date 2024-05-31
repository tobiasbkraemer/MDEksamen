import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './Screens/TodoList';


const Stack = createStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'Todo List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

