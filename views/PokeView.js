import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as color from '../styles/variables/colors';
import { texts } from '../styles/texts';
import { layouts } from '../styles/layouts';


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
            <View style={layouts.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={layouts.container}>
            <View style={layouts.titleContainer}>
                <Text style={texts.mainTitle}>{data.name}</Text>
            </View>
            <View>
                {stats.map((stat, index) => (
                    <View 
                        style={layouts.statContainer}
                        key={index}
                    >
                        <Text style={styles.statTitle}>{stat.stat.name}</Text>
                        <Text style={styles.statValue}>{stat.base_stat}</Text>
                    </View>
                ))}
            </View>
            <View 
                style={layouts.statContainer}
            >
                <Text style={styles.statTitle}>Poids</Text>
                <Text style={styles.statValue}>{data.weight} lbs</Text>
            </View>
            <Image
                style={styles.cardImage}
                source={{ uri: data.sprites.other.showdown.front_default }}
            />
            <TouchableOpacity 
                style={[layouts.button, { 
                    backgroundColor: inPokedex ? 'red' : color.yellow,
                    shadowColor: inPokedex ? 'red' : color.yellow,
                    position: 'absolute',
                    bottom: 5,
                }]}
                onPress={() => pokedex()}
            >
                <Text style={ texts.buttonText }>
                    {inPokedex ? 'Supprimer du' : 'Ajouter au'} Pokedex
                </Text>
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
        marginVertical: 10,
        width: '100%',
        height: '32.5%',
        objectFit: 'contain',
    },
    statTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: color.yellow,
    },
    statValue: {
        fontSize: 15,
        textAlign: 'center',
        color: color.blue,
    },
});

