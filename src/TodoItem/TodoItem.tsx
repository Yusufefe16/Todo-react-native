import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert, Modal, View, TextInput, Button } from 'react-native';
import styles from './TodoItem.style';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    dueDate?: number;
}

interface TodoItemProps {
    item: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onRemove, onUpdate }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newText, setNewText] = useState(item.text);

    const handleLongPress = () => {
        Alert.alert(
            'Seçenekler',
            'Bir seçenek seçin:',
            [
                { text: 'Güncelle', onPress: () => setModalVisible(true) },
                { text: 'Sil', onPress: () => onRemove(item.id) },
                { text: 'İptal', style: 'cancel' },
            ]
        );
    };

    const handleUpdate = () => {
        onUpdate(item.id, newText);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => onToggle(item.id)}
                onLongPress={handleLongPress}
                style={styles.todoItem}
            >
                <Text style={[styles.todoText, item.completed && styles.todoCompleted]}>
                    {item.text}
                </Text>
                {item.dueDate && (
                    <Text style={styles.dueDateText}>
                        {new Date(item.dueDate).toLocaleString()}
                    </Text>
                )}
            </TouchableOpacity>

            {/* Güncelleme Modal'ı */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Todo Güncelle</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={newText}
                            onChangeText={setNewText}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="İptal" onPress={() => setModalVisible(false)} />
                            <Button title="Güncelle" onPress={handleUpdate} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default TodoItem;
