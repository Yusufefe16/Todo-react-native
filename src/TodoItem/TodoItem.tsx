import React, { useState } from 'react';
import {Text, TouchableOpacity, Alert, Modal, View, TextInput, Button, Platform} from 'react-native';
import styles from './TodoItem.style';
import DateTimePicker from "@react-native-community/datetimepicker";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    dueDate: Date;
}

interface TodoItemProps {
    item: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, newText: string, selectedDate: Date) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onRemove, onUpdate }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newText, setNewText] = useState(item.text);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleLongPress = () => {
        Alert.alert(
            'Seçenekler',
            'Bir seçenek seçin:',
            [
                { text: 'Güncelle', onPress: () => {
                        setModalVisible(true);
                        setSelectedDate(item.dueDate);
                    } },
                { text: 'Sil', onPress: () => onRemove(item.id) },
                { text: 'İptal', style: 'cancel' },
            ]
        );
    };

    const handleUpdate = () => {
        if (newText.trim() === '') {
            Alert.alert('Hata', 'Todo metni boş olamaz.');
            return;
        }
        if (!selectedDate) {
            Alert.alert('Hata', 'Todo metni boş olamaz.');
            return;
        }
        onUpdate(item.id, newText, selectedDate);
        setModalVisible(false);
    };

    const onDateChange = (event: any, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            setSelectedDate(date);
            if (Platform.OS === 'android') {
                setShowTimePicker(true);
            }
        }
    };

    const onTimeChange = (event: any, time?: Date) => {
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        if (time && selectedDate) {
            const updatedDate = new Date(selectedDate);
            updatedDate.setHours(time.getHours());
            updatedDate.setMinutes(time.getMinutes());
            setSelectedDate(updatedDate);
        }
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
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.dateButtonText}>Tarih ve Saat Seç</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate ? selectedDate : new Date()}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedDate ? selectedDate : new Date()}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                        {selectedDate && (
                            <Text style={styles.selectedDateText}>
                                Seçilen Tarih: {selectedDate.toLocaleString()}
                            </Text>
                        )}
                        <View style={styles.modalButtons}>
                            <Button title="İptal" onPress={() => {
                                setModalVisible(false);
                                setSelectedDate(null);
                            }} />
                            <Button title="Güncelle" onPress={handleUpdate} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default TodoItem;
