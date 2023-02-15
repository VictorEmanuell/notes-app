import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from './styles';
import Colors from '../../assets/Colors';

import { NoteCard } from '../../components/NoteCard';

import Data from '../../data.json';

export function Home({ navigation }) {
    const { notes } = Data;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.menu}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                    }}
                >
                    <Feather name='menu' size={30} color={Colors.white} />
                </TouchableOpacity>

                <Text style={[styles.textHeader, { fontSize: 20 }]}>Minhas Notas</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.search}
                >
                    <Feather name='search' size={28} color={Colors.white} />
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
                }}
            >
                <MaterialCommunityIcons name='pencil' size={28} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}