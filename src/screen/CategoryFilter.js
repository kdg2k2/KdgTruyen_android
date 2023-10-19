import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import fetchData from '../api/api';

const CategoryFilter = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData('category');
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
    <View style={{flex: 1}}>
      <FlatList
        style={{backgroundColor: '#000'}}
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{margin: 5, flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListFilter', {id: item.id});
              }}>
              <Text
                style={{
                  color: '#fafafa',
                  marginBottom: 5,
                  borderWidth: 2,
                  borderColor: '#333',
                  marginTop: 10,
                  padding: 3,
                  borderRadius: 5,
                  fontSize: 13,
                  textAlign: 'center',
                }}>
                {item.tentheloai}
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
  );
};

export default CategoryFilter;
