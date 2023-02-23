// import modules

import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useIsFocused } from '@react-navigation/native';

// import styles/assets

import { styles } from './styles';
import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

// import components

import { NoteCard } from '../../../components/NoteCard';
import { Loading } from '../../../components/Loading';

// import services

import Storage from '../../../services/Storage';

export function Notes({ setMode, folderSelect, navigation }) {
    //hooks

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        getNotes()
    }, [isFocused])

    useEffect(() => {
        getNotes()
    }, [isSelectable])

    // methods

    const getNotes = async () => {
        let response = await Storage.notes.getAll()

        if (folderSelect) {
            let notesFolder = [];

            response.forEach(item => {

                if (item.folder && item.folder === folderSelect.id) {
                    notesFolder.push(item)
                }
            })

            setNotes(notesFolder)
        } else {
            setNotes(response)
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }

    const deleteNotes = async () => {
        setIsLoading(true)
        await Storage.notes.delete(isSelectable)

        setTimeout(() => {
            setIsSelectable(false)
            setIsLoading(false)
            hideMenu()
        }, 500)
    }

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    isSelectable ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => {
                                Vibration.vibrate(15, false)

                                if (isSelectable.length < notes.length) {
                                    let notesId = []
                                    notes.forEach(item => notesId.push(item.id))
                                    setIsSelectable(notesId)
                                } else {
                                    setIsSelectable([])
                                }
                            }}
                        >
                            <Ionicons
                                name={isSelectable.length < notes.length ? "checkmark-done-circle-outline" : "checkmark-done-circle"}
                                size={26}
                                color={Colors.white}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => {
                                Vibration.vibrate(15, false)
                                setMode('folders')
                            }}
                        >
                            <SimpleLineIcons name='folder-alt' size={26} color={Colors.white} />
                        </TouchableOpacity>
                    )
                }

                <Text style={[styles.textHeader, { fontSize: 20 }]}>{folderSelect ? folderSelect.name : 'Minhas notas'}</Text>

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
                    {
                        isSelectable ? (
                            <MenuItem
                                onPress={() => {
                                    Vibration.vibrate(50, false)
                                    hideMenu()
                                    setIsSelectable(false)
                                }}
                                pressColor="#0000000D"
                                textStyle={{
                                    fontFamily: Fonts.light,
                                    fontSize: 15
                                }}
                            >Cancelar</MenuItem>
                        ) : (
                            <MenuItem
                                onPress={() => {
                                    Vibration.vibrate(50, false)
                                    hideMenu()
                                    setIsSelectable([])
                                }}
                                pressColor="#0000000D"
                                textStyle={{
                                    fontFamily: Fonts.light,
                                    fontSize: 15
                                }}
                            >Selecionar</MenuItem>
                        )
                    }
                    <MenuDivider />
                    {
                        isSelectable && isSelectable.length > 0 ? (
                            <MenuItem
                                textStyle={{
                                    color: 'red',
                                    fontFamily: Fonts.light,
                                    fontSize: 15
                                }}
                                pressColor="#0000000D"
                                onPress={() => {
                                    Vibration.vibrate(50, false)
                                    deleteNotes()
                                }}
                            >Excluir</MenuItem>
                        ) : null
                    }
                </Menu>
            </View>

            <ScrollView
                decelerationRate={0.96}
                showsVerticalScrollIndicator={false}
            >
                {
                    notes.map(({ id, title, date, text, folder }) => {
                        return (
                            <NoteCard
                                key={id}
                                id={id}
                                title={title}
                                date={date}
                                text={text}
                                navigation={navigation}
                                isSelectable={isSelectable}
                                setIsSelectable={setIsSelectable}
                            />
                        )
                    })
                }
            </ScrollView>

            <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.8}
                onPressIn={() => {
                    Vibration.vibrate(15, false)
                    navigation.navigate('NewNote', { folderSelect })
                }}
            >
                <MaterialCommunityIcons name='pencil' size={28} color={Colors.white} />
            </TouchableOpacity>
            <Loading active={isLoading} text="Carregando..." />
        </View>
    );
}