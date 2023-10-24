import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import fetchData from '../api/api';

const ListFilter = ({navigation, route}) => {
  const {id} = route.params;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData('list/' + id);
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Hàm lọc danh sách dựa trên từ khóa tìm kiếm
  const filteredData = data.filter(item =>
    item.tentruyen.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (data.length <= 0) {
    return (
      <View
        style={{
          backgroundColor: '#000',
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 40,
            borderRadius: 40,
            position: 'absolute',
            top: 10,
            left: 10,
          }}>
          <TouchableOpacity onPress={handleBackPress} style={{zIndex: 99}}>
            <Image
              source={require('../asset/icon/back.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#fff',
          }}>
          Không có dữ liệu
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={handleBackPress} style={{zIndex: 99}}>
          <Image
            source={require('../asset/icon/back.png')}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              marginTop: 5,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginRight: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              source={require('../asset/icon/loupe.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                marginTop: 5,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CategoryFilter');
            }}>
            <Image
              source={require('../asset/icon/filter.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 10,
                    paddingLeft: 10,
                    borderColor: 'green',
                    width: '100%',
                  }}
                  placeholder="Nhập từ khóa tìm kiếm"
                  onChangeText={text => setSearchText(text)}
                  value={searchText}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
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

export default ListFilter;
