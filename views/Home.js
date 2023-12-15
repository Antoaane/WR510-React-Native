import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Pocke Wiki</Text>
            {users}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 40,
        color: '#ffdb57',
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
