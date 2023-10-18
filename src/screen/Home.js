// src/screen/Home.js

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native';
import fetchData from '../api/api';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData('home');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <FlatList
      style={{backgroundColor: '#000'}}
      data={data}
      numColumns={2} // Hiển thị 2 phần tử mỗi dòng
      renderItem={({item}) => (
        <View style={{margin: 5, flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {slug: item.slug});
            }}>
            <Image
              style={{width: 170, height: 250}}
              source={{
                uri: `http://127.0.0.1:8000/${item.path}`,
              }}
            />
            <Text style={{color: '#fafafa', textAlign: 'center'}}>
              {item.tentruyen}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={<Text>No data</Text>}
    />
  );
};

export default Home;
