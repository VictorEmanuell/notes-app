import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        padding: 20,
        elevation: 5
    },
    title: {
        fontFamily: Fonts.extraBold,
        fontSize: 25,
        color: Colors.white,
    },
    date: {
        fontFamily: Fonts.light,
        fontSize: 14,
        color: Colors.white,
        marginVertical: 1
    },
    text: {
        fontFamily: Fonts.bold,
        fontSize: 12,
        color: Colors.white,
        marginTop: 8
    }
});