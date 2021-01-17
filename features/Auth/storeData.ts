import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (data: { email: string; token: string }) => {
    try {
        await AsyncStorage.setItem('DD-E-commerce', JSON.stringify(data));
    } catch (err) {
        console.error(err.message);
    }
};

export default storeData;
