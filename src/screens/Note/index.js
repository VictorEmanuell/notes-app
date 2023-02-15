import { View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function Note({ route, navigation }) {
    const { id, title, date, text } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        navigation.goBack()
                    }}
                >
                    <SimpleLineIcons name="arrow-left" size={22} color={Colors.white} />
                </TouchableOpacity>

                <Text style={styles.textTitle}>{title}</Text>

                <TouchableOpacity
                    style={styles.optionsButton}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                    }}
                >
                    <SimpleLineIcons name="options-vertical" size={22} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                <Text dataDetectorType='all' selectable={true} style={styles.textBody}>{text}</Text>
            </ScrollView>
        </View>
    );
}