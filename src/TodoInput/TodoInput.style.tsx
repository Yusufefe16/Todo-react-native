import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    dateButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    addButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 5,
    },
});
