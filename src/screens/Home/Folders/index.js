import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'

import { styles } from './styles';
import Colors from '../../../assets/Colors';

export function Folders({ setMode, data, navigation }) {
    const { notes } = data;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setMode('notes')
                    }}
                >
                    <SimpleLineIcons name='notebook' size={26} color={Colors.white} />
                </TouchableOpacity>

                <Text style={[styles.textHeader, { fontSize: 20 }]}>Pastas</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                    }}
                >
                    <SimpleLineIcons name='options-vertical' size={25} color={Colors.white} />
                </TouchableOpacity>
            </View>

            {/* <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map(({ id, title, date, text }) => {
                        return <NoteCard key={id} id={id} title={title} date={date} text={text} navigation={navigation} />
                    })
                }
            </ScrollView> */}
        </View>
    );
}