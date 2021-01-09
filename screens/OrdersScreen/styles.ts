
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    arrow: {
        flex: 1,
        textAlign: 'right',
        alignSelf: 'center',
    },
    badge: {
        position: 'absolute',
        zIndex: 1,
        left: 58,
        bottom: 5,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});

export default styles;
