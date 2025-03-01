/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, StyleSheet, Alert} from 'react-native';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import notifee, {AndroidImportance, TimestampTrigger, TriggerType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from "./Footer";


interface Todo {
    id: string;
    text: string;
    completed: boolean;
    dueDate: Date;
}



const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        loadTodos();
    }, []);

    // 2) Todo listesi her değiştiğinde AsyncStorage'a kaydet
    useEffect(() => {
        storeTodos(todos);
    }, [todos]);

    // AsyncStorage'dan Todo listesini yükler
    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (err) {
            console.log('Todo verileri yüklenirken hata oluştu:', err);
        }
    };

    // Todo listesini AsyncStorage'a kaydeder
    const storeTodos = async (todosToStore: Todo[]) => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todosToStore));
        } catch (err) {
            console.log('Todo verileri kaydedilirken hata oluştu:', err);
        }
    };

    const addTodo = (todoText: string, dueDate: Date) => {
        if (todoText.trim()) {
            const newTodo:Todo = {
                id: Date.now().toString(),
                text: todoText,
                completed: false,
                dueDate: dueDate,
            };
            setTodos([...todos, newTodo]);
            if (dueDate) {
                scheduleNotificationForTodo(newTodo);
            }
            setText('');
        }
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    const removeTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, newText: string, dueDate: Date) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text: newText , dueDate: dueDate} : todo
            )
        );
    };

    const removeSelectedTodos = () => {
        Alert.alert(
            'Uyarı',
            `Seçili olan ${completedTodoCount} adet todo silinecek. Emin misiniz?`,
            [
                { text: 'Evet', onPress: () => setTodos(todos.filter(todo => !todo.completed)) },
                { text: 'Hayır', style: 'cancel' },
            ]

        );
    };

    const activeTodoCount:number = todos.filter((todo:Todo) => !todo.completed).length;
    const completedTodoCount:number = todos.filter((todo:Todo) => todo.completed).length;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Todo Uygulaması</Text>
            <Text style={styles.counter}>Aktif Todo Sayısı: {activeTodoCount}</Text>
            <TodoInput value={text} onChangeText={setText} onAddTodo={addTodo} />
            <FlatList
                data={todos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TodoItem item={item} onToggle={toggleTodo} onRemove={removeTodo} onUpdate={updateTodo}  />
                )}
            />
            {todos.some(todo => todo.completed) && (
                <Footer onRemoveSelected={removeSelectedTodos} />
            )}
        </SafeAreaView>
    );
};

// Seçilen tarih geldiğinde bildirimi tetiklemek için
async function scheduleNotificationForTodo(todo: { id: string; text: string; completed: boolean; dueDate: Date; }) {
    // Bildirim izni iste (iOS için)
    await notifee.requestPermission();

    // Android için bildirim kanalı oluştur
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });

    // Eğer dueDate gelecekteyse, tetikleyici ayarla
    if (todo.dueDate && todo.dueDate.getTime() > Date.now()) {
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP, // Zaman tabanlı tetikleme
            timestamp: todo.dueDate.getTime(),       // Seçilen tarih
        };

        await notifee.createTriggerNotification(
            {
                title: todo.text,
                body: 'Belirlediğiniz zaman geldi!',
                android: {
                    channelId,
                    smallIcon: 'ic_launcher',
                },
            },
            trigger
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    counter: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default App;
