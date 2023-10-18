import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import fetchData from '../api/api';

const Reading = ({route, navigation}) => {
  const {slug} = route.params;
  const {id} = route.params;
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#333',
          textAlign: 'center',
        }}>
        {data.tentap}
      </Text>
      <TouchableOpacity onPress={handleBackPress} style={{zIndex: 99}}>
        <Image
          source={require('../asset/icon/back.png')}
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

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{zIndex: 99}}>
        <Image
          source={require('../asset/icon/menu.png')}
          style={{
            zIndex: 2,
            backgroundColor: '#fafafa',
            position: 'absolute',
            top: screenHeight - 80,
            left: 10,
            borderRadius: 10,
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>

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
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Image
                  source={require('../asset/icon/cancel.png')}
                  style={{
                    width: 27,
                    height: 27,
                  }}
                />
              </TouchableOpacity>
              {data.tap_trc != null && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Reading', {
                      slug: data.truyen.slug,
                      id: data.tap_trc,
                    });
                    setModalVisible(false);
                    flatListRef.current.scrollToOffset({
                      offset: 0,
                      animated: true,
                    });
                  }}>
                  <Image
                    source={require('../asset/icon/left.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              )}
              {data.tap_sau != null && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Reading', {
                      slug: data.truyen.slug,
                      id: data.tap_sau,
                    });
                    setModalVisible(false);
                    flatListRef.current.scrollToOffset({
                      offset: 0,
                      animated: true,
                    });
                  }}>
                  <Image
                    source={require('../asset/icon/right.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        ref={flatListRef}
        data={data.arr_path}
        keyExtractor={index => index.toString()}
        renderItem={({item}) => (
          <View>
            <Image
              style={{width: screenWidth, height: screenHeight, flex: 1}}
              resizeMode="stretch"
              source={{uri: `http://127.0.0.1:8000/${item}`}}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Reading;
