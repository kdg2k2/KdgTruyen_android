import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import fetchData from '../api/api';

const Detail = ({route, navigation}) => {
  const {slug} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(slug);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, [slug]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {data.truyen ? (
        <>
          <Image
            style={{width: 160, height: 180}}
            source={{
              uri: `http://127.0.0.1:8000/${data.truyen.path}`,
            }}
          />
          <Text style={{color: '#fafafa'}}>{data.truyen.tentruyen}</Text>
          <Text style={{color: '#fafafa'}}>Lượt xem: {data.truyen.view}</Text>
          <Text style={{color: '#fafafa'}}>
            Trạng thái:{' '}
            {data.truyen.status === 0 ? 'Đang tiến hành' : 'Hoàn thành'}
          </Text>

          <View>
            <Text style={{color: '#fafafa'}}>
              Tác giả: {data.arr_tacgia.map(item => item.tentacgia).join(', ')}
            </Text>
          </View>

          <View>
            <Text style={{color: '#fafafa'}}>
              Thể loại:{' '}
              {data.arr_theloai.map(item => item.tentheloai).join(', ')}
            </Text>
          </View>

          <Text style={{color: '#fafafa', marginBottom: 10}}>
            {data.truyen.mota}
          </Text>

          <FlatList
            data={data.arr_tap}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Reading', {
                      slug: data.truyen.slug,
                      id: item.id,
                    });
                  }}>
                  <Text style={{color: '#fafafa'}}>{item.tentap}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={{color: '#fafafa'}}>Dữ liệu không khả dụng</Text>
      )}
    </View>
  );
};

export default Detail;
