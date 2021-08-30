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
import Icon from 'react-native-vector-icons/Ionicons';

export default () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#222831',
      }}>
      <Icon
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
        name="musical-notes-outline"
        size={500}
        color="grey"
      />
    </View>
  );
};
