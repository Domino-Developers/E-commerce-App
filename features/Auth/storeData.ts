import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (data: { email: string; token: string }) => {
    try {
        await AsyncStorage.setItem('DD-E-commerce', JSON.stringify(data));
    } catch (err) {
        console.error(err.message);
    }
};

export const removeData = async () => {
    try {
        await AsyncStorage.removeItem('DD-E-commerce');
    } catch (err) {
        console.error();
    }
};

export default storeData;
