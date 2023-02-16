import { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import { styles } from './styles';
import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

import { NoteCard } from '../../../components/NoteCard';

export function Notes({ setMode, data, folderSelect, navigation }) {
    const { notes } = data;

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

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

                <Menu
                    visible={visible}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => {
                                Vibration.vibrate(15, false)
                                showMenu()
                            }}
                        >
                            <SimpleLineIcons name='options-vertical' size={25} color={Colors.white} />
                        </TouchableOpacity>
                    }
                    onRequestClose={hideMenu}
                    style={{
                        borderRadius: 15,
                        width: '45%'
                    }}
                    animationDuration={200}
                >
                    <MenuItem
                        onPress={() => {
                            Vibration.vibrate(50, false)
                            hideMenu()
                        }}
                        pressColor="#0000000D"
                        textStyle={{
                            fontFamily: Fonts.light,
                            fontSize: 15
                        }}
                    >Selecionar</MenuItem>
                    <MenuDivider />
                    {/* <MenuItem
                        textStyle={{
                            color: 'red',
                            fontFamily: Fonts.light,
                            fontSize: 15
                        }}
                        pressColor="#0000000D"
                        onPress={hideMenu}
                    >Excluir</MenuItem> */}
                </Menu>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map(({ id, title, date, text, folder }) => {
                        if (folderSelect) {
                            if (folder === folderSelect) {
                                return (
                                    <NoteCard
                                        key={id}
                                        id={id}
                                        title={title}
                                        date={date}
                                        text={text}
                                        navigation={navigation}
                                    />
                                )
                            }
                        } else {
                            return (
                                <NoteCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    date={date}
                                    text={text}
                                    navigation={navigation}
                                />
                            )
                        }
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