import { StyleSheet } from "react-native";

const colors = {
    primary: '#ffdb57',
    secondary: '#ffdb57',
    dark: '#000000',
    light: '#ffffff',
    grey: '#eeeeee',
};

export const layout = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const texts = StyleSheet.create({
    mainTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
