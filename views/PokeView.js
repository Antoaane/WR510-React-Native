import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as color from '../styles/variables/colors';
import * as text from '../styles/texts';
import * as layout from '../styles/layouts';


export default function PokeView({ route }) {
    const { id } = route.params;

    const [data, setData] = useState([]);
    const [stats, setStats] = useState([]);
    const [inPokedex, setInPokedex] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkPokedex = async () => {
        try {
            const value = await AsyncStorage.getItem('pokedex');
            if (value !== null) {
                const table = JSON.parse(value);
                if (table.includes(id)) {
                    setInPokedex(true);
                } else {
                    setInPokedex(false);
                }
            } else {
                setInPokedex(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const apiLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
            try {
                const response = await axios.get(apiLink);
                setData(response.data);
                setStats(response.data.stats);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        checkPokedex();
    }, []);


    const pokedex = async () => {
        try {
            const value = await AsyncStorage.getItem('pokedex');
            if (value !== null) {
                const newTable = JSON.parse(value);
                if (newTable.includes(id)) {
                    newTable.splice(newTable.indexOf(id), 1);
                    await AsyncStorage.setItem('pokedex', JSON.stringify(newTable));
                    setInPokedex(false);
                } else {
                    newTable.push(id);
                    await AsyncStorage.setItem('pokedex', JSON.stringify(newTable));
                    setInPokedex(true);
                }
            } else {
                const newTable = [id];
            
                await AsyncStorage.setItem('pokedex', JSON.stringify(newTable));
            }
        } catch (error) {
            console.log(error);
        }
        checkPokedex();
    }

    if (loading) {
        return (
            <View style={layout.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={layout.container}>
            <View style={layout.titleContainer}>
                <Text style={text.mainTitle}>{data.name}</Text>
            </View> 
            <View>
                {stats.map((stat, index) => (
                    <View 
                        style={layout.titleContainer}
                        key={index}
                    >
                        <Text>{stat.stat.name}</Text>
                        <Text>{stat.base_stat}</Text>
                    </View>
                ))}
            </View>
            <Text >Poids : {data.weight} lbs</Text>
            <Image
                style={styles.cardImage}
                source={{ uri: data.sprites.front_default }}
            />
            <TouchableOpacity 
                style={layout.titleContainer}
                onPress={() => pokedex()}
            >
                <Text>{inPokedex ? 'Supprimer du' : 'Ajouter au'} Pokedex</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '28.5%',
        aspectRatio: 1,
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cardHeader: {
        width: '100%',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardImage: {
        width: '100%',
        height: '40%',
        objectFit: 'contain',
    },
});

