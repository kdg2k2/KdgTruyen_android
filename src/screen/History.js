import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
  ScrollView,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'kdgtruyen',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const History = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]); // Dữ liệu FlatList

  const handleRefresh = () => {
    setRefreshing(true);
    setData([]); // Xóa dữ liệu
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM lichsu', [], (tx, results) => {
        if (results.rows.length > 0) {
          const fetchedData = [];
          for (let index = 0; index < results.rows.length; index++) {
            const row = results.rows.item(index);
            fetchedData.push(row);
          }
          setData(fetchedData);
        }
      });
    });
    setRefreshing(false);
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM lichsu', [], (tx, results) => {
        if (results.rows.length > 0) {
          const fetchedData = [];
          for (let index = 0; index < results.rows.length; index++) {
            const row = results.rows.item(index);
            fetchedData.push(row);
          }
          setData(fetchedData);
        }
      });
    });
  }, []);

  const cleanTable = () => {
    db.transaction(tx => {
      tx.executeSql('Delete from lichsu;');
    });
    console.log('clean table');
  };

  const {height} = Dimensions.get('window');

  if (!data || data.length <= 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={{
          backgroundColor: '#000',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 50,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000',
              lineHeight: 50,
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 10,
            }}>
            Lịch sử đọc
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                cleanTable();
                handleRefresh();
              }}>
              <Image
                source={require('../asset/icon/trash-bin.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: height / 2.5,
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            Chưa có lịch sử
          </Text>
        </View>
      </ScrollView>
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
        <Text
          style={{
            color: '#000',
            lineHeight: 50,
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          }}>
          Lịch sử đọc
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginRight: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              cleanTable();
              handleRefresh();
            }}>
            <Image
              source={require('../asset/icon/trash-bin.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Danh sách truyện tranh */}
      <FlatList
        style={{backgroundColor: '#000'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        extraData={refreshing}
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View
            style={{
              margin: 5,
              width: 170,
              position: 'relative',
            }}>
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

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Reading', {
                    slug: item.slug,
                    id: item.id_tap,
                  });
                }}>
                <Text
                  style={{
                    zIndex: 1000,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    textAlign: 'center',
                    color: '#fff',
                    height: 30,
                    lineHeight: 30,
                    position: 'absolute',
                    bottom: 19,
                  }}>
                  Đọc tới {item.tentap}
                </Text>
              </TouchableOpacity>
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

export default History;
