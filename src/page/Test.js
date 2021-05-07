import React, {useRef} from 'react';
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
export default () => {
  const windowWidth = (Dimensions.get('window').width * 3) / 5.5;
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
          left: 10,
          width: w,
          height: '80%',
          backgroundColor: 'white',
          borderRadius: 30,
          zIndex: 20,
        }}>
        <TextInput
          style={{width: '100%', height: '100%', paddingHorizontal: 10}}
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
          onPress={() => handlerPress()}
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
          onPress={() => handlerPress()}
          style={{width: '100%', height: '100%'}}>
          <Icon name="calendar" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>
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
          onPress={() => handlerPress()}
          style={{width: '100%', height: '100%'}}>
          <Icon name="pluscircleo" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
