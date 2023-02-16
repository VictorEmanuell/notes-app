import { useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';

import { styles } from './styles';

export function NoteCard({ id, title, date, text, navigation }) {
    const fadeInUp = useRef(new Animated.Value(-1000)).current;

    Animated.timing(fadeInUp, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false
    }).start();

    return (
        <Animated.View style={[styles.container, { bottom: fadeInUp }]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate('Note', { id, title, date, text })
                }}
            >
                {title ? <Text style={styles.title}>{title}</Text> : null}
                {date ? <Text style={styles.date}>{date}</Text> : null}
                {text ? <Text numberOfLines={5} style={styles.text}>{text}</Text> : null}
            </TouchableOpacity>
        </Animated.View>
    );
}