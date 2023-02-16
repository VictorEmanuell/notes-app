import { StyleSheet } from 'react-native';

import Fonts from '../../../assets/Fonts';
import Colors from '../../../assets/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
        paddingTop: 22,
        width: '100%',
    },
    textHeader: {
        fontFamily: Fonts.bold,
        color: Colors.white
    }
});