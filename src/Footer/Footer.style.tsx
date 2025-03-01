import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {

    },
    footerContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        // Dilerseniz sabit bir konumda tutmak için:
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // backgroundColor: '#fff',
    },
    footerButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
