import { useState } from 'react';
import { View, TextInput, Vibration, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import Colors from '../../assets/Colors';

export function EditNote({ route, navigation }) {
    const editNote = route.params;

    const [inputHeight, setInputHeight] = useState(0);
    const [title, onChangeTitle] = useState(editNote.title);
    const [text, onChangeText] = useState(editNote.text);

    return (
        <ScrollView
            style={styles.container}
            decelerationRate={0.96}
            showsVerticalScrollIndicator={false}
        >
            <KeyboardAvoidingView behavior="height">
                <View style={styles.header}>
                    <SimpleLineIcons name="note" size={24} color={Colors.white} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={() => {
                            Vibration.vibrate(15, false)
                            navigation.goBack()
                        }}
                        style={styles.closeButton}
                    >
                        <AntDesign name="close" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.inputTitle}
                    placeholder="Título"
                    placeholderTextColor="#499999"
                    keyboardType="visible-password"
                    onChangeText={onChangeTitle}
                    value={title}
                />

                <TextInput
                    style={[styles.inputText, { height: Math.max(35, inputHeight) }]}
                    placeholder="Escreva aqui..."
                    placeholderTextColor="#499999"
                    keyboardType="text"
                    multiline={true}
                    autoCorrect={false}
                    onContentSizeChange={(event) => {
                        setInputHeight(event.nativeEvent.contentSize.height)
                    }}
                    onChangeText={onChangeText}
                    value={text}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPressIn={() => {
                        Vibration.vibrate(15, false)
                    }}
                    style={styles.saveButton}
                >
                    <Text style={styles.textSave}>Salvar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}