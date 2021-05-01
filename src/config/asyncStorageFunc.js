import AsyncStorage from '@react-native-async-storage/async-storage';

/**Async storage function to store key data */
export async function storeItem(key, item) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        //var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        await AsyncStorage.setItem(key, JSON.stringify(item));
        //return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**Async storage function to get key data */
export async function retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  /**Async storage function to remove key data */
export async function removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

/**Async storage function to clear data */
export async function clearStore(keyArr) {
  try {
    await AsyncStorage.multiRemove(keyArr);
    return true;
  }
  catch(exception) {
    console.log(exception);
    return false;
  }
}

/**Async storage function to get multiple key data */
export const getMultiple = async (keyArr) => {
  let values
  try {
    //['@MyApp_user', '@MyApp_key']
    values = await AsyncStorage.multiGet(keyArr);
    return values;
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  } catch(e) {
    console.log(e);
  }
  return;
}


export const SetMultiple = async (dataArr) => {
  // const firstPair = ["@MyApp_user", "value_1"]
  // const secondPair = ["@MyApp_key", "value_2"]
  try {
    await AsyncStorage.multiSet(dataArr/*[firstPair, secondPair]*/);
  } catch(e) {
    //save error
    console.log(e);
  }
}




