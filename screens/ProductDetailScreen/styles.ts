import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    cross: {
        textDecorationLine: 'line-through',
    },
    priceArea: {
        padding: 10,
        alignItems: 'center',
    },
    descriptionArea: {
        padding: 10,
        margin: 10,
    },
    feedback: {
        flexDirection: 'row',
    },
    feedback__rating: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingRight: 20,
    },
    feedback__rating_text: {
        fontSize: 50,
        // fontWeight: 'bold',
    },
    feedback__rating_stars: {
        alignItems: 'center',
    },
    feedback__bars: {
        flex: 3,
    },
    feedback__bar_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
    },
    feedback__bar: {
        // paddingHorizontal: 5,
        borderRadius: 6,
        height: 12,
    },
    container: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
    },
    ratingWithDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    chip: {
        marginHorizontal: 5,
        paddingVertical: 0,
    },
    commentContainer: {
        marginVertical: 10,
    },
});
export default styles;
