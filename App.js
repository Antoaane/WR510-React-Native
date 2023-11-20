import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);

  //request to randomuser api with axios
  useEffect(() => {
    const fetchData = async () => {
      axios.get('https://randomuser.me/api/?results=30')
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
  //loop through data and display all first names
  const users = data.map((item, index) => {
    return (
      <View key={index}>
        <Text>{item.name.first}</Text>
      </View>
    );
  });



  return (
    <View style={styles.container}>
      <Text> Users </Text>
      {users}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#279df5cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
