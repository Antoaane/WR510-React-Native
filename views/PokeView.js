import { SafeAreaView, StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import * as color from '../styles/variables/colors';
import * as text from '../styles/texts';
import * as layout from '../styles/layouts';


export default function PokeView({ route }) {
    const { id } = route.params;

    const [data, setData] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
     
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
    }, []);

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

