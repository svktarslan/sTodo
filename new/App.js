import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NativeRouter, Route, Redirect, useLocation} from 'react-router-native';

const App = () => {
  return <View style={{flex: 1, backgroundColor: 'purple'}}></View>;
};
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <NativeRouter>
          <App />
        </NativeRouter>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
