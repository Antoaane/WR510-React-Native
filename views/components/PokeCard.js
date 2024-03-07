import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PokeCard(props) {
    const navigation = useNavigation();
    const { name, imageUrl, id } = props;

    const handlePressPokemon = () => {
        navigation.navigate('PokeView', { id });
    }

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => handlePressPokemon(id)}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{name}</Text>
            </View>
            <Image
                style={styles.cardImage}
                source={{ uri: imageUrl }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '30%',
        aspectRatio: 1,
        margin: 5,
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
        width: '80%',
        height: '70%',
    },
});