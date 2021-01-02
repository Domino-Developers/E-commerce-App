import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    title: {
        letterSpacing: 1,
        fontSize: 20,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    about: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    badge: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1,
        fontSize: 15,
    },
    cross: {
        textDecorationLine: 'line-through',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
    },
    quantityIcon: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 0,
        margin: 0,
        backgroundColor: '#eee',
    },
    quantityIconLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    quantityIconRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    quantity: {
        fontSize: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        textAlignVertical: 'center',
    },
});

export default styles;