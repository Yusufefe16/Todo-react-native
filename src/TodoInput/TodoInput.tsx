import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './TodoInput.style';

interface TodoInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onAddTodo: (text: string, dueDate: Date | null) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChangeText, onAddTodo }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
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

    const handleAddTodo = () => {
        if (!selectedDate) {
            setErrorMessage('Lütfen önce tarih ve saat seçiniz.');
            return;
        }
        onAddTodo(value, selectedDate);
        // Todo eklendikten sonra tarihi ve hata mesajını resetle
        setSelectedDate(null);
        setErrorMessage('');
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Yeni Todo Ekle"
                value={value}
                onChangeText={onChangeText}
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
            {/* Seçili tarih varsa ekranda göster */}
            {selectedDate && (
                <Text style={styles.selectedDateText}>
                    Seçilen Tarih: {selectedDate.toLocaleString()}
                </Text>
            )}


            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};

export default TodoInput;
