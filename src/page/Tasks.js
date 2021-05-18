import React, {useContext, useState} from 'react';
import {
  FlatList,
  Animated,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useParams} from 'react-router';
import {Context} from '../lib/Context';
import {setStorage} from '../lib/storage';

const setIndex = (arr, index, value) => {
  const result = [...arr];
  result[index] = value;
  return result;
};

export default ({data, setData, setIsPanelActive}) => {
  const {tags} = useParams();
  data = data?.filter(e => e.tags.includes(tags));
  const [realData, setRealData] = useState(data);
  console.log(realData);
  const Task = ({state, time, title, setState}) => {
    const {setTest, setDurum, setTime} = useContext(Context);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setTime(time);
          setDurum(state);
          setTest(title);
          setIsPanelActive(true);
        }}
        onLongPress={() => {
          setStorage(
            'tasks',
            realData.filter(e => e.title !== title),
          );
          setRealData(realData.filter(e => e.title !== title));
          setData(realData.filter(e => e.title !== title));
        }}
        delayLongPress={400}
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#393e46',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#393e46',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                setState(!state);
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                backgroundColor: state ? '#5ee045' : 'white',
              }}></TouchableOpacity>
          </View>
          <View style={{flex: 6, justifyContent: 'center'}}>
            <Text
              style={{
                paddingHorizontal: 10,
                color: state ? 'grey' : 'white',
                fontSize: 16,
                textDecorationLine: state ? 'line-through' : null,
              }}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{width: '90%', height: '85%', marginTop: 20}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Tasks
        </Text>
      </View>
      <View style={{flex: 4}}>
        <Animated.FlatList
          data={realData}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item, index}) => (
            <Task
              state={item.state}
              tags={item.tags}
              title={item.title}
              time={item.time}
              index={index}
              setState={state =>
                setData(setIndex(data, index, {...data[index], state}))
              }
            />
          )}
        />
      </View>
    </View>
  );
};
