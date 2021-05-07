import React, {useRef, useState} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
import {useHistory, useLocation, useParams} from 'react-router';
import {setStorage} from '../lib/storage';
export default ({data, setData}) => {
  let {pathname} = useLocation();
  const history = useHistory();
  const [send, setSend] = useState(false);
  const [task, setTask] = useState('');
  const windowWidth = (Dimensions.get('window').width * 2) / 3.3;
  const windowHeight = Dimensions.get('window').height;
  const mode = useRef(new Animated.Value(0)).current;
  const handlerPress = () => {
    Animated.sequence([
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const w = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth],
  });
  const h = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 20,
        left: '10%',
        width: '80%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#393e46',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: '10%',
          left: 5,
          width: w,
          height: '80%',
          backgroundColor: 'white',
          borderRadius: 30,
          zIndex: 20,
        }}>
        <TextInput
          value={task}
          onChangeText={setTask}
          style={{
            width: '100%',
            height: '100%',
            paddingHorizontal: 10,
            color: 'black',
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 7,
          left: '10%',
          width: h,
          height: h,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => history.push('/home')}
          style={{width: '100%', height: '100%'}}>
          <Icon name="home" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 7,
          left: '44%',
          width: h,
          height: h,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => history.push('/setting')}
          style={{width: '100%', height: '100%'}}>
          <Icon name="setting" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>
      {send ? (
        task === '' ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 7,
              right: '5%',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handlerPress();
                setSend(false);
              }}
              style={{width: '100%', height: '100%'}}>
              <Icon name="closecircleo" size={35} color="red" />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              position: 'absolute',
              top: 7,
              right: '5%',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handlerPress();
                setSend(false);
                setStorage('tasks', [
                  {
                    title: task,
                    state: false,
                    tags:
                      pathname === '/home' || pathname === '/tasks/a'
                        ? ['a']
                        : pathname === '/tasks/b'
                        ? ['a', 'b']
                        : pathname === '/tasks/c'
                        ? ['a', 'c']
                        : ['a', 'd'],
                  },
                  ...data,
                ]);
                setData([
                  {
                    title: task,
                    state: false,
                    tags:
                      pathname === '/home' || pathname === '/tasks/a'
                        ? ['a']
                        : pathname === '/tasks/b'
                        ? ['a', 'b']
                        : pathname === '/tasks/c'
                        ? ['a', 'c']
                        : ['a', 'd'],
                  },
                  ...data,
                ]);
                setTask('');
              }}
              style={{width: '100%', height: '100%'}}>
              <Icon name="pluscircleo" size={35} color="#5ee045" />
            </TouchableOpacity>
          </Animated.View>
        )
      ) : (
        <Animated.View
          style={{
            position: 'absolute',
            top: 7,
            right: '10%',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              handlerPress();
              setSend(true);
            }}
            style={{width: '100%', height: '100%'}}>
            <Icon name="pluscircleo" size={35} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};
