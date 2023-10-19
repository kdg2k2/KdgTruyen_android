// src/screen/Home.js

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import fetchData from '../api/api';
import SwiperFlatList from 'react-native-swiper-flatlist';

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

  const {width} = Dimensions.get('window');

  return (
    <View style={{backgroundColor: '#000'}}>
      <View>
        <Text
          style={{
            color: '#fafafa',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Truyện hot
        </Text>
        <SwiperFlatList
          style={{
            zIndex: 10,
          }}
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={1}
          data={data.truyen_view}
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
                <Text
                  style={{
                    color: '#fafafa',
                    textAlign: 'center',
                    maxWidth: 170,
                    overflow: 'hidden',
                  }}>
                  {item.tentruyen}
                </Text>
              </TouchableOpacity>
            </View>
          )}></SwiperFlatList>
      </View>

      <View>
        <Text
          style={{
            color: '#fafafa',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Truyện mới cập nhật
        </Text>
        <FlatList
          style={{backgroundColor: '#000'}}
          data={data.truyen_update}
          numColumns={2}
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
      </View>
    </View>
  );
};
export default Home;
