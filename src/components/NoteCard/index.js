// import modules

import { useRef } from 'react';
import { TouchableOpacity, Text, Animated, Vibration } from 'react-native';

// import styles/assets

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function NoteCard({ id, title, date, text, navigation, isSelectable, setIsSelectable }) {
    const fadeInUp = useRef(new Animated.Value(-1000)).current;

    Animated.timing(fadeInUp, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
    }).start();

    if (isSelectable) {
        return (
            <Animated.View style={[
                styles.container,
                {
                    bottom: fadeInUp,
                    backgroundColor: (isSelectable.includes(id) ? Colors.blue : Colors.secondary)
                }
            ]}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => {
                        if (!isSelectable.includes(id)) {
                            Vibration.vibrate(15, false)
                            setIsSelectable(old => [...old, id])
                        } else {
                            Vibration.vibrate(15, false)
                            setIsSelectable(isSelectable.filter(i => i != id))
                        }
                    }}
                    onPressOut={() => {
                        if (isSelectable.length === 0) {
                            setIsSelectable(false);
                        }
                    }}
                    delayPressIn={100}
                >
                    {title ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : null}
                    {date ? <Text numberOfLines={1} style={styles.date}>{date}</Text> : null}
                    {text ? <Text numberOfLines={5} style={styles.text}>{text}</Text> : null}
                </TouchableOpacity>
            </Animated.View>
        );
    } else {
        return (
            <Animated.View style={[styles.container, { bottom: fadeInUp }]}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        navigation.navigate('Note', { id, title, date, text })
                    }}
                    onLongPress={() => {
                        Vibration.vibrate(50, false)
                        setIsSelectable([id])
                    }}
                >
                    {title ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : null}
                    {date ? <Text numberOfLines={1} style={styles.date}>{date}</Text> : null}
                    {text ? <Text numberOfLines={5} style={styles.text}>{text}</Text> : null}
                </TouchableOpacity>
            </Animated.View>
        );
    }
}