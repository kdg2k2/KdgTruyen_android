import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Dimensions,
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
  const [data, setData] = useState(null);

  const handleRefresh = () => {
    setRefreshing(true);
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

  if (!data || data.length <= 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
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
        </View>
        {/* Danh sách truyện tranh */}
        <View
          style={{
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            Không có dữ liệu
          </Text>
        </View>
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
      </View>
      {/* Danh sách truyện tranh */}
      <FlatList
        style={{backgroundColor: '#000'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <View
            style={{
              margin: 5,
            }}>
            <View
              style={{
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
