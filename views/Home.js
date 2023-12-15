import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import * as color from '../styles/variables/colors';
import * as text from '../styles/texts';
import * as layout from '../styles/layouts';

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios.get('https://pokeapi.co/api/v2/pokemon/')
                .then(response => {
                    setData(response.data.results);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        fetchData();
    }, []);

    console.log(data);
    const users = data.map((item, index) => {
        return (
            <View key={index}>
                <Text>{item.name}</Text>
            </View>
        );
    });

    return (
        <View style={layout.container}>
            {users}
        </View>
    );
}
