import { StyleSheet } from 'react-native';

import Fonts from '../../assets/Fonts';
import Colors from '../../assets/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: '100%',
    },
    backButton: {
        padding: 5
    },
    textTitle: {
        fontFamily: Fonts.bold,
        fontSize: 25,
        color: Colors.white,
        paddingHorizontal: 10
    },
    optionsButton: {
        position: 'absolute',
        right: 0,
        padding: 20
    },
    textBody: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 5
    }
});