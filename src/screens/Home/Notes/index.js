import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'

import { styles } from './styles';
import Colors from '../../../assets/Colors';

import { NoteCard } from '../../../components/NoteCard';

export function Notes({ setMode, data, navigation }) {
    const { notes } = data;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setMode('folders')
                    }}
                >
                    <SimpleLineIcons name='folder-alt' size={26} color={Colors.white} />
                </TouchableOpacity>

                <Text style={[styles.textHeader, { fontSize: 20 }]}>Minhas Notas</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                    }}
                >
                    <SimpleLineIcons name='options-vertical' size={25} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map(({ id, title, date, text }) => {
                        return <NoteCard key={id} id={id} title={title} date={date} text={text} navigation={navigation} />
                    })
                }
            </ScrollView>

            <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.8}
                onPressIn={() => {
                    Vibration.vibrate(15, false)
                    navigation.navigate('NewNote')
                }}
            >
                <MaterialCommunityIcons name='pencil' size={28} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}