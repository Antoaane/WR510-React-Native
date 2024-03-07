import { StyleSheet } from 'react-native';
import * as colors from './variables/colors';

export const layouts = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex : 1,
    },
    titleContainer: {
        width: '92.5%',
        paddingVertical: 5,
        marginHorizontal: '3.75%',
        marginVertical: '2%',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: colors.yellow,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 2.62,
        elevation: 4,

        backgroundColor: 'white',
        borderRadius: 10,
    },
    statContainer: {
        width: '92.5%',
        padding: 10,
        marginHorizontal: '3.75%',
        marginVertical: '1%',
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        shadowColor: colors.yellow,
        elevation: 4,

        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        width: '92.5%',
        padding: 15,
        marginHorizontal: '3.75%',
        marginVertical: '1%',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 4,

        borderRadius: 10,
    },
});
