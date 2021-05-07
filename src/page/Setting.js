import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {useHistory} from 'react-router';
import {setSdata} from '../lib/storage';
export default () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  useEffect(() => {
    (async () => {
      setName(await AsyncStorage.getItem('name'));
      setSurname(await AsyncStorage.getItem('surname'));
      setEmail(await AsyncStorage.getItem('email'));
    })();
  }, []);
  return (
    <View
      style={{
        width: '85%',
        height: '80%',
        marginTop: 20,
      }}>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#222831',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="camerao" color="white" size={40} />
        </View>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            width: '90%',
            height: 50,
            backgroundColor: '#222831',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 10,
          }}
          placeholder="Name"
        />
        <TextInput
          value={surname}
          onChangeText={setSurname}
          style={{
            width: '90%',
            height: 50,
            backgroundColor: '#222831',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 10,
          }}
          placeholder="Surname"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={{
            width: '90%',
            height: 50,
            backgroundColor: '#222831',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 10,
          }}
          placeholder="email"
        />
      </View>
      <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setSdata('name', name);
            setSdata('surname', surname);
            setSdata('email', email);
            history.push('/home');
          }}
          style={{
            width: '90%',
            height: 40,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#222831',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, color: '#222381'}}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
