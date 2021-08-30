import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
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
  const wid = Dimensions.get('window').width;
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
  const h = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  const keyboard = useRef(new Animated.Value(0)).current;
  const keyboardAnimation = () => {
    Animated.sequence([
      Animated.timing(keyboard, {
        toValue: keyboardStatus ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const k = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const kw = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [(wid * 4) / 5, wid],
  });
  const kww = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (wid * 3) / 4],
  });
  const kl = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [wid / 10, 0],
  });
  const kr = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });
  useEffect(() => {
    keyboardAnimation();
  }, [keyboardStatus]);
  const [focus, setFocus] = useState(false);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: k,
        left: kl,
        width: kw,
        height: 50,
        borderRadius: kr,
        backgroundColor: '#393e4699',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {focus ? (
        <Animated.View
          style={{
            position: 'absolute',
            top: '10%',
            left: 5,
            width: kww,
            height: '80%',
            backgroundColor: 'white',
            borderRadius: 30,
            zIndex: 20,
          }}>
          <TextInput
            value={task}
            autoFocus={true}
            onChangeText={setTask}
            blurOnSubmit={false}
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 10,
              color: 'black',
            }}
          />
        </Animated.View>
      ) : null}
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
                setFocus(!focus);
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
                setFocus(!focus);
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
                    time: (new Date().getHours(), ':', new Date().getMinutes()),
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
                    time: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}   ${new Date().getHours()}:${new Date().getMinutes()}`,
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
              setFocus(!focus);
            }}
            style={{width: '100%', height: '100%'}}>
            <Icon name="pluscircleo" size={35} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};
