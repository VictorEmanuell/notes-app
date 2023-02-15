import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';

export function NoteCard({ id, title, date, text, navigation }) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => {
                navigation.navigate('Note', { id, title, date, text })
            }}
        >
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {date ? <Text style={styles.date}>{date}</Text> : null}
            {text ? <Text numberOfLines={5} style={styles.text}>{text}</Text> : null}
        </TouchableOpacity>
    );
}