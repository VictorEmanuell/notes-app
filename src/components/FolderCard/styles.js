import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    folderContainer: {
        alignItems: 'center',
    },
    textName: {
        fontFamily: Fonts.light,
        fontSize: 15,
        color: Colors.white,
        marginTop: 5
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