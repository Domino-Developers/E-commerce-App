import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    section: {
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    price: {
        flex: 1,
        textAlign: 'right'
    }
});

export default styles;
