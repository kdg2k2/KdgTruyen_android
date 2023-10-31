import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import fetchData from '../api/api';

const Detail = ({route, navigation}) => {
  const {slug} = route.params;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData(slug);
      setData(result);
    } catch (error) {
      console.error('Lỗi call api, đổi port đê:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [slug]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataFromApi();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <TouchableOpacity onPress={handleBackPress} style={{zIndex: 99}}>
        <Image
          source={require('../asset/icon/back.png')}
          resizeMode="contain"
          style={{
            zIndex: 2,
            backgroundColor: '#fafafa',
            position: 'absolute',
            top: 10,
            left: 10,
            borderRadius: 35,
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {data.truyen ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 3,
              }}>
              <View style={{marginTop: 10}}>
                <Image
                  style={{width: 100, height: 150}}
                  source={{
                    uri: `http://127.0.0.1:8000/${data.truyen.path}`,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Reading', {
                      slug: data.truyen.slug,
                      id: data.max_tap,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#fafafa',
                      marginBottom: 5,
                      borderWidth: 2,
                      borderColor: '#333',
                      marginTop: 5,
                      padding: 3,
                      borderRadius: 5,
                      fontSize: 13,
                      textAlign: 'center',
                      backgroundColor: 'green',
                    }}>
                    Đọc mới nhất
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  flex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: '#333',
                    marginBottom: 10,
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fafafa',
                      marginBottom: 5,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {data.truyen.tentruyen}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../asset/icon/eye.png')}
                      resizeMode="contain"
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: '#fafafa',
                        marginRight: 5,
                      }}
                    />
                    <Text style={{color: '#fafafa', marginBottom: 5}}>
                      {data.truyen.view}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Image
                      source={require('../asset/icon/waiting.png')}
                      resizeMode="contain"
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: '#fafafa',
                        marginRight: 5,
                      }}
                    />
                    <Text style={{color: '#fafafa', marginBottom: 5}}>
                      {' '}
                      {data.truyen.status === 0
                        ? 'Đang tiến hành'
                        : 'Hoàn thành'}
                    </Text>
                  </View>
                </View>

                <Text style={{color: '#fafafa', marginBottom: 5}}>
                  Tác giả:{' '}
                  {data.arr_tacgia.map(item => item.tentacgia).join(', ')}
                </Text>

                <View style={styles.container}>
                  {data.arr_theloai.map((item, index) => (
                    <TouchableOpacity key={index}
                      onPress={() => {
                        navigation.navigate('ListFilter', {id: item.id});
                      }}>
                      <Text  style={styles.text}>
                        {item.tentheloai}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <Text style={{color: '#fafafa', marginBottom: 10}}>
              {data.truyen.mota}
            </Text>
          </>
        ) : (
          <Text
            style={{
              color: '#fafafa',
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            Đang tải...
          </Text>
        )}
      </ScrollView>

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
              <Text
                style={{
                  color: '#fafafa',
                  paddingLeft: 20,
                  marginBottom: 10,
                  backgroundColor: '#333',
                  height: 30,
                  lineHeight: 30,
                }}>
                {item.tentap}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  text: {
    color: '#fafafa',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 10,
    padding: 3,
    borderRadius: 5,
    fontSize: 13,
    textAlign: 'center',
  },
});

export default Detail;
