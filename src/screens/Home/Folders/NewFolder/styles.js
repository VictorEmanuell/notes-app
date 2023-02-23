import { StyleSheet } from 'react-native';

import Fonts from '../../../../assets/Fonts';
import Colors from '../../../../assets/Colors';

export const styles = StyleSheet.create({
    containerNewFolder: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        elevation: 5,
    },
    headerNewFolder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputNewFolder: {
        color: Colors.primary,
        padding: 10,
        fontFamily: Fonts.regular,
        fontSize: 15,
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 0.5,
        marginTop: 10
    },
    colorsNewFolder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    colorButton: {
        borderColor: Colors.blue,
        borderRadius: 10,
        borderRadius: 10,
        margin: 4,
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
    textSaveButton: {
        fontFamily: Fonts.bold,
        fontSize: 15,
        color: Colors.white
    }
});