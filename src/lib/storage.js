import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('saving error : ' + e);
  }
};

export const getStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('reading error : ' + e);
  }
};

export const getSdata = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    console.log(e);
  }
};
export const setSdata = async (key, value) => {
  console.log(key, value);
  try {
    await AsyncStorage.setItem(key, String(value));
  } catch (e) {
    console.log(e);
  }
};
