import { SafeAreaView, StyleSheet, View, StatusBar, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PokeCard from './components/PokeCard';

import * as color from '../styles/variables/colors';
import { texts } from '../styles/texts';
import { layouts } from '../styles/layouts';

export default function App() {
    const [data, setData] = useState([]);

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
            layouts.container, {
              backgroundColor: color.gray,
            }
          )}
        >
            <StatusBar style="auto" />
            <View style={layouts.container}>
                <View style={layouts.titleContainer}>
                    <Text style={texts.mainTitle}>Pokemons</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity 
                        style={StyleSheet.compose(
                            layouts.container, {
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
