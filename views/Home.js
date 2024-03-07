import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, FlatList } from 'react-native';
import axios from 'axios';

import PokeCard from './components/PokeCard';

import * as color from '../styles/variables/colors';
import { texts } from '../styles/texts';
import { layouts } from '../styles/layouts';

export default function App() {
    const [data, setData] = useState([]);
    const [i, setI] = useState(1);

    const fetchData = async () => {
        let newData = [];
        for (let n = i; n < (i + 21); n++) {
            const apiLink = `https://pokeapi.co/api/v2/pokemon/${n}`;
            try {
                const response = await axios.get(apiLink);
                newData.push(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        setData([...data, ...newData]);
        setI(i + 21);
    };

    useEffect(() => {
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
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <PokeCard
                            id={item.id}
                            name={item.name}
                            imageUrl={item.sprites.front_default}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'space-between',
                    }}
                    onEndReached={fetchData}
                />
            </View>
        </SafeAreaView>
    );
}
