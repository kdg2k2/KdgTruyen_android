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
      console.error('Lỗi call api, đổi port đê:', error);
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
    <FlatList
      style={{flex: 1, backgroundColor: '#000'}}
      ListHeaderComponent={
        <>
          <Text
            style={{
              color: '#fafafa',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              marginLeft: 5,
            }}>
            Đọc Nhiều Nhất
          </Text>
          <SwiperFlatList
            style={{
              zIndex: 10,
            }}
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
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
                    numberOfLines={item.tentruyen.length > 20 ? 1 : 0}
                    style={{
                      color: '#fafafa',
                      textAlign: 'center',
                      maxWidth: 170,
                      overflow: 'hidden',
                      fontWeight: 'bold',
                    }}>
                    {item.tentruyen}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text
            style={{
              color: '#fafafa',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            Mới Cập Nhật
          </Text>
        </>
      }
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
            <Text
              numberOfLines={item.tentruyen.length > 20 ? 1 : 0}
              style={{
                color: '#fafafa',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
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
