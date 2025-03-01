import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    todoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    todoText: {
        fontSize: 18,
    },
    todoCompleted: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    dueDateText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 10,
    },
});
