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
import BottomBar from './src/component/BottomBar';
import {getStorage, setStorage} from './src/lib/storage';
import Home from './src/page/Home';
import Setting from './src/page/Setting';
import Tasks from './src/page/Tasks';
import {SwipeablePanel} from 'rn-swipeable-panel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context} from './src/lib/Context';
import Test from './src/page/Test';

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const tasks = await getStorage('tasks');
      if (tasks !== null) setData(tasks);
    })();
  }, []);

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: false,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const [test, setTest] = useState('deneme');
  const [durum, setDurum] = useState(false);
  const [time, setTime] = useState('');
  const value = {
    test,
    setTest,
    setDurum,
    setTime,
  };

  const Background = () => {
    let {pathname} = useLocation();
    return (
      <View
        style={{
          backgroundColor: pathname === '/setting' ? 'white' : '#222831',
          flex: 1,
          alignItems: 'center',
        }}>
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 30,
                borderRadius: 10,
                color: 'white',
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: '#00adb5',
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{paddingHorizontal: 10}}>{time}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                  }}>
                  <Icon
                    name="check-square-o"
                    size={33}
                    color={durum ? '#5ee045' : 'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="trash-o" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '90%',
                height: 40,
                borderRadius: 10,
                backgroundColor: '#222831',
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <TextInput style={{fontSize: 16, color: 'white', padding: 10}}>
                {test}
              </TextInput>
            </View>
            <View
              style={{
                width: '90%',
                minHeight: 100,
                flex: 1,
                flexWrap: 'wrap',
                borderRadius: 10,
                backgroundColor: '#222831',
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <TextInput
                multiline={true}
                style={{fontSize: 16, color: 'white', padding: 10}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </TextInput>
            </View>
          </View>
        </SwipeablePanel>
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
          <Test />
        </Route>
        <Route exact path="/setting">
          <Setting />
        </Route>
        <Route exact path="/tasks/:tags">
          <Tasks
            data={data}
            setData={setData}
            setIsPanelActive={setIsPanelActive}
          />
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
        <Context.Provider value={value}>
          <NativeRouter>
            <Background />
          </NativeRouter>
        </Context.Provider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
