import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useHistory, useParams} from 'react-router';
import {setStorage} from '../lib/storage';

const Task = ({state, tags, title, setState}) => {
  return (
    <TouchableWithoutFeedback
      onLongPress={() => {
        setStorage(
          'tasks',
          test.filter(e => e.title !== title),
        );
        setTest(test.filter(e => e.title !== title));
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
            onPress={() => setState(!state)}
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
              color: 'white',
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

const setIndex = (arr, index, value) => {
  const result = [...arr];
  result[index] = value;
  return result;
};

export default ({data, setData}) => {
  const {tags} = useParams();
  data = data?.filter(e => e.tags.includes(tags));
  const [test, setTest] = useState(data);
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
        <FlatList
          data={test}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item, index}) => (
            <Task
              state={item.state}
              tags={item.tags}
              title={item.title}
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
