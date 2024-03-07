import { SafeAreaView, StyleSheet, View, StatusBar, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import PokeCard from './components/PokeCard';

import * as color from '../styles/variables/colors';
import { texts } from '../styles/texts';
import { layouts } from '../styles/layouts';

export default function Pokedex() {
    const [data, setData] = useState([]);

    const pokedexIds = async () => {
        const value = await AsyncStorage.getItem('pokedex');
        if (value !== null) {
            const pokemonIds = JSON.parse(value);
            console.log(pokemonIds);
            loadData(pokemonIds);
        }
    };

    const loadData = async (pokemonIds) => {
        const pokemonData = await Promise.all(pokemonIds.map(async (id) => {
            const apiLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
            try {
                const response = await axios.get(apiLink);
                return response.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }));

        setData(pokemonData.filter(Boolean));
    };

    useFocusEffect(
        useCallback(() => {
            pokedexIds();
        }, [])
    );

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
                    <Text style={texts.mainTitle}>Pokedex</Text>
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
