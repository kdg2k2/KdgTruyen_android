import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, Dimensions} from 'react-native';
import fetchData from '../api/api';

const Reading = ({route}) => {
  const {slug} = route.params;
  const {id} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(slug + '/' + id);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, [slug, id]);

  return (
    <FlatList
      data={data.arr_path}
      keyExtractor={(index) => index.toString()} // Sử dụng index làm key
      renderItem={({ item }) => (
        <View>
          <Image
            style={{ width: screenWidth, height: screenHeight }}
            resizeMode="stretch"
            source={{ uri: `http://127.0.0.1:8000/${item}` }}
          />
        </View>
      )}
    />
  );
};

export default Reading;
