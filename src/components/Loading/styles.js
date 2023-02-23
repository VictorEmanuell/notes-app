import { StyleSheet } from 'react-native';

import Fonts from '../../assets/Fonts';
import Colors from '../../assets/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    activityIndicator: {
        padding: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 15
    },
    text: {
        fontFamily: Fonts.light,
        fontSize: 15,
        color: Colors.white,
        padding: 8
    }
});