import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import PokeCard from './components/PokeCard';

import { texts } from '../styles/texts';
import { layouts } from '../styles/layouts';

export default function Searching() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonData, setPokemonData] = useState(null);

    const searchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <View style={layouts.titleContainer}>
                    <Text style={texts.mainTitle}>Search</Text>
                </View>
            <TextInput
                style={layouts.input}
                placeholder="Enter a Pokemon name"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <TouchableOpacity
                style={layouts.button}
                onPress={searchPokemon}
            >
                <Text style={texts.buttonText}>Search</Text>
            </TouchableOpacity>
            {pokemonData && (
                <PokeCard
                    id={pokemonData.id}
                    name={pokemonData.name}
                    imageUrl={pokemonData.sprites.front_default}
                />
            )}
        </View>
    );
};