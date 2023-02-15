import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from './styles';
import Colors from '../../assets/Colors';

import { NoteCard } from '../../components/NoteCard';

import Data from '../../data.json';

export function Home() {
    const { notes } = Data;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.menu}
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

                {
                    notes.map(({ id, title, date, text }) => {
                        return <NoteCard key={id} title={title} date={date} text={text} />
                    })
                }
            </ScrollView>

            <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.8}
            >
                <MaterialCommunityIcons name='pencil' size={28} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}