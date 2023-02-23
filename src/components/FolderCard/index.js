// import modules

import { useRef } from 'react';
import { TouchableOpacity, Text, Animated, View, Vibration } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

// import styles/assets

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function FolderCard({
    id,
    name,
    color,
    setMode,
    setFolderSelect,
    isSelectable,
    setIsSelectable,
}) {
    const fadeInLeft = useRef(new Animated.Value(-1000)).current;

    Animated.timing(fadeInLeft, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
    }).start();

    if (isSelectable) {
        return (
            <Animated.View style={[
                styles.container,
                {
                    left: fadeInLeft,
                    backgroundColor: (isSelectable.includes(id) ? Colors.blue : Colors.secondary),
                    paddingVertical: 23.5
                }
            ]}>
                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
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
                    <Ionicons
                        name={isSelectable.includes(id) ? 'checkmark-circle' : 'checkmark-circle-outline'}
                        size={35}
                        color={Colors.white}
                    />
                    <Text numberOfLines={1} style={styles.textName}>{name}</Text>
                </TouchableOpacity>
            </Animated.View >
        )
    } else {
        return (
            <Animated.View style={[
                styles.container,
                {
                    left: fadeInLeft,
                    backgroundColor: (color ? color : Colors.secondary)
                }
            ]}>
                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
                    onPress={() => {
                        setFolderSelect({ id, name })
                        setMode('notes')
                    }}
                    onLongPress={() => {
                        Vibration.vibrate(50, false)
                        setIsSelectable([id])
                    }}
                >
                    <SimpleLineIcons name="folder" size={24} color={Colors.white} />

                    <Text numberOfLines={1} style={styles.textName}>{name}</Text>
                </TouchableOpacity>
            </Animated.View >
        )
    }
}

export function FolderOptions({
    setMode,
    setFolderSelect,
    isSelectable,
    setIsSelectable,
    folders,
    setModalVisible
}) {
    const fadeInLeft = useRef(new Animated.Value(-1000)).current;

    Animated.timing(fadeInLeft, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
    }).start();

    if (isSelectable) {
        return (
            <Animated.View style={[
                styles.container,
                {
                    left: fadeInLeft,
                    backgroundColor: Colors.secondary,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 37
                }
            ]}>
                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)

                        if (isSelectable.length < folders.length) {
                            let foldersId = []
                            folders.forEach(item => foldersId.push(item.id))
                            setIsSelectable(foldersId)
                        } else {
                            setIsSelectable([])
                        }
                    }}
                >
                    <Ionicons
                        name={isSelectable.length < folders.length ? "checkmark-done-circle-outline" : "checkmark-done-circle"}
                        size={35}
                        color={Colors.white}
                    />
                </TouchableOpacity>

                <View style={{
                    width: 1,
                    backgroundColor: 'gray'
                }} />

                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setIsSelectable(false)
                    }}
                >
                    <Ionicons
                        name="close-circle"
                        size={35}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </Animated.View >
        )
    } else {
        return (
            <Animated.View style={[
                styles.container,
                {
                    left: fadeInLeft,
                    backgroundColor: Colors.secondary,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }
            ]}>
                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setFolderSelect(null)
                        setMode('notes')
                    }}
                >
                    <SimpleLineIcons name="folder-alt" size={24} color={Colors.white} />

                    <Text style={styles.textName}>    Todas     </Text>
                </TouchableOpacity>

                <View style={{
                    width: 1,
                    backgroundColor: 'gray'
                }} />

                <TouchableOpacity
                    style={styles.folderContainer}
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                        setModalVisible(true)
                    }}
                >
                    <SimpleLineIcons name="plus" size={24} color={Colors.white} />

                    <Text style={styles.textName}>Nova pasta</Text>
                </TouchableOpacity>
            </Animated.View >
        )
    }

}