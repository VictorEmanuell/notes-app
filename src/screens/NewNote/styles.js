import { StyleSheet } from 'react-native';

import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.green,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    closeButton: {
        padding: 5,
        backgroundColor: '#4eaaa3',
        borderRadius: 10
    },
    inputTitle: {
        color: Colors.white,
        padding: 20,
        fontFamily: Fonts.extraBold,
        fontSize: 26
    },
    inputText: {
        color: Colors.white,
        padding: 20,
        fontFamily: Fonts.extraBold,
        fontSize: 16,
    },
    saveButton: {
        padding: 20,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        borderRadius: 10,
    },
    textSave: {
        fontFamily: Fonts.bold,
        fontSize: 15,
        color: Colors.white
    }
});