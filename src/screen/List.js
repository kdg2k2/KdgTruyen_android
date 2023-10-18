// src/screen/List.js

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import fetchData from '../api/api';

const List = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData('list');
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

  // Hàm lọc danh sách dựa trên từ khóa tìm kiếm
  const filteredData = data.filter(item =>
    item.tentruyen.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{flex: 1}}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          paddingLeft: 10,
          borderColor: 'green',
        }}
        placeholder="Nhập từ khóa tìm kiếm"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      {/* Danh sách truyện tranh */}
      <FlatList
        style={{backgroundColor: '#000'}}
        data={filteredData}
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
              <Text style={{color: '#fafafa'}}>{item.tentruyen}</Text>
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
  );
};

export default List;
