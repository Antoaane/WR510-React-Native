import { SafeAreaView, StyleSheet, View, StatusBar, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PokeCard from './components/PokeCard';

import * as color from '../styles/variables/colors';
import * as text from '../styles/texts';
import * as layout from '../styles/layouts';

export default function App() {
    const [data, setData] = useState([]);
    const images = data.map(item => item.sprites.front_default);
    const names = data.map(item => item.forms[0].name);

    useEffect(() => {
        let i = 1;
        const fetchData = async () => {
            while (i <= 21) {
                const apiLink = `https://pokeapi.co/api/v2/pokemon/${i}`;
                try {
                    const response = await axios.get(apiLink);
                    setData(currentData => [...currentData, response.data]);
                } catch (error) {
                    console.log(error);
                }
                i++;
            }
        };
        fetchData();

    }, []);

    return (
        <SafeAreaView style={StyleSheet.compose(
            layout.container, {
              backgroundColor: color.gray,
            }
          )}
        >
            <StatusBar style="auto" />
            <View style={layout.container}>
                <View style={layout.titleContainer}>
                    <Text style={text.mainTitle}>Pocke Wiki</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity 
                        style={StyleSheet.compose(
                            layout.container, {
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly',
                            }
                        )}
                        
                    >
                        {data.map((item, index) => (
                            <PokeCard
                                key={index}
                                id={item.id}
                                name={item.name}
                                imageUrl={item.sprites.front_default}
                            />
                        ))}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
