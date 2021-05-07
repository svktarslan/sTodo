import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  BackHandler,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  NativeRouter,
  Route,
  Redirect,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-native';
import BottomBar from './src/component/BottomBar';
import {getStorage, setStorage} from './src/lib/storage';
import Home from './src/page/Home';
import Setting from './src/page/Setting';
import Tasks from './src/page/Tasks';
import Test from './src/page/Test';
export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      setData(await getStorage('tasks'), {
        title: '12345',
        state: false,
        tags: [],
      });
    })();
  }, []);
  const Background = () => {
    let {pathname} = useLocation();
    return (
      <View
        style={{
          backgroundColor: pathname === '/setting' ? 'white' : '#222831',
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            backgroundColor: pathname !== '/setting' ? 'white' : '#222831',
            width: 400,
            height: 400,
            borderRadius: 200,
          }}></View>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/setting">
          <Setting />
        </Route>
        <Route exact path="/tasks/:tags">
          <Tasks data={data} setData={setData} />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <BottomBar data={data} setData={setData} />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <NativeRouter>
          <Background />
        </NativeRouter>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
