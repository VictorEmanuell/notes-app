// import modules

import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

// import styles/assets

import { styles } from './styles';
import Colors from '../../../assets/Colors';
import Fonts from '../../../assets/Fonts';

// import components

import { FolderCard, FolderOptions } from '../../../components/FolderCard';
import { Loading } from '../../../components/Loading';
import { NewFolder } from './NewFolder';

// import services

import Storage from '../../../services/Storage';

export function Folders({ setMode, setFolderSelect }) {
    // hooks

    const [folders, setFolders] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFolders()
    }, [modalVisible || isSelectable])

    // methods

    const getFolders = async () => {
        setFolders(await Storage.folders.getAll())

        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }

    const deleteFolders = async () => {
        setIsLoading(true)
        await Storage.folders.delete(isSelectable)

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
                            setIsSelectable([])
                        }}
                        pressColor="#0000000D"
                        textStyle={{
                            fontFamily: Fonts.light,
                            fontSize: 15
                        }}
                    >Selecionar</MenuItem>
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
                                    deleteFolders()
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
                <FolderOptions
                    setMode={setMode}
                    setFolderSelect={setFolderSelect}
                    isSelectable={isSelectable}
                    setIsSelectable={setIsSelectable}
                    folders={folders}
                    setModalVisible={setModalVisible}
                />
                {
                    folders.map(({ id, name, color }) => {
                        return (
                            <FolderCard
                                key={id}
                                id={id}
                                name={name}
                                color={color}
                                setMode={setMode}
                                setFolderSelect={setFolderSelect}
                                isSelectable={isSelectable}
                                setIsSelectable={setIsSelectable}
                            />
                        )
                    })
                }
            </ScrollView>
            <NewFolder modalVisible={modalVisible} setModalVisible={setModalVisible} isLoading={isLoading} setIsLoading={setIsLoading} />
            <Loading active={isLoading} text="Carregando..." />
        </View>
    );
}