import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../Home';
import Pokedex from '../Pokedex';
import Searching from '../Searching';

import * as color from '../../styles/variables/colors';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Pokedex') {
                        iconName = focused
                            ? 'book'
                            : 'book-outline';
                    } else if (route.name === 'Searching') {
                        iconName = focused
                            ? 'search'
                            : 'search-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: color.yellow,
                tabBarInactiveTintColor: color.blue,
                tabBarLabelStyle: {
                    fontSize: 0,
                  },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Pokedex" component={Pokedex} />
            <Tab.Screen name="Searching" component={Searching} />
        </Tab.Navigator>
    );
}