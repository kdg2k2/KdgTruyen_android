// src/screen/Home.js

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import fetchData from '../api/api';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData('home');
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataFromApi().then(() => setRefreshing(false));
  };

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default Home;
