import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory} from 'react-router';
import {getSdata, getStorage} from '../lib/storage';
import Icon from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import {Context} from '../lib/Context';

export default () => {
  const history = useHistory();
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      setName(await AsyncStorage.getItem('name'));
    })();
  }, []);
  console.log(
    new Date().getDate(),
    '/',
    new Date().getMonth(),
    new Date().getFullYear(),
  );
  const data = [
    {
      title: 'All',
      tag: 'a',
      icon: 'clipboard-list-outline',
    },
    {
      title: 'Music',
      tag: 'b',
      icon: 'clipboard-list-outline',
    },
    {
      title: 'Tasks',
      tag: 'a',
      icon: 'clipboard-list-outline',
    },
    {
      title: 'Film',
      tag: 'b',
      icon: 'clipboard-list-outline',
    },
  ];

  const test = data.reduce((acc, product, y) => {
    let key = product['tag'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});
  return (
    <View style={{width: '85%', height: '80%', marginTop: 20}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Hello {name}</Text>
        </View>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '100%',
              height: '85%',
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaskedView
              style={{flex: 1, flexDirection: 'row', height: '100%'}}
              maskElement={
                <View
                  style={{
                    // Transparent background because mask is based off alpha channel.
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 60,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    sTodo
                  </Text>
                </View>
              }>
              <View
                style={{flex: 1, height: '100%', backgroundColor: '#00adb5'}}
              />
              <View
                style={{flex: 1, height: '100%', backgroundColor: '#393e46'}}
              />
            </MaskedView>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => history.push('/tasks/a')}
          style={{
            width: '43%',
            height: '70%',
            backgroundColor: '#393e46',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            <IconM name="clipboard-list-outline" size={40} />
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => history.push('/tasks/b')}
          style={{
            width: '43%',
            height: '70%',
            backgroundColor: '#393e46',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            <Icon name="folder-music" size={40} />
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>Music</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => history.push('/tasks/c')}
          style={{
            width: '43%',
            height: '70%',
            backgroundColor: '#393e46',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            <Icon5 name="tasks" size={40} />
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => history.push('/tasks/d')}
          style={{
            width: '43%',
            height: '70%',
            backgroundColor: '#393e46',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            <Icon5 name="film" size={40} />
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>Film</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
