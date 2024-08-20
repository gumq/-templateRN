import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import Text from '../Text';
import {colors, fontSize} from '../../themes';
import {hScale, scale} from '../../utils/resolutions';
import {arrow_down, close, noData} from '../../svgImg';
import {SvgXml} from 'react-native-svg';
import {RadioProvince} from '../radio';
import {Button} from '../buttons';
import SearchBar from '../SearchBar';
import {SearchModal} from '../../components';
import {translateLang} from '../../store/accLanguages/slide';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

const CardModal = ({
  data,
  title,
  setValue,
  value,
  optree,
  optreeValue,
  opstreeNameStatus,
  treeModule,
  listRecommend,
  setisEror,
  opreport = false,
  disabled = false,
  maintenance = false,
}) => {
  const [ishowModal, setIsShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(
    maintenance === true ? data : [],
  );
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const languageKey = useSelector(translateLang);
  const handleSelection = item => {
    setValue(item);
    setSelectedItem(item);
  };
  const openShowModal = () => {
    maintenance===true&&setSearchResults(data);
    setIsShowModal(true);
  };

  const closeModal = () => {
   maintenance===true&& setSearchText('');
    setIsShowModal(false);
  };

  const onChangeText = textSearch => {
    if (textSearch?.length) {
      setSearchText(textSearch);
      const resultsData = SearchModal(data, textSearch);
      setSearchResults(resultsData);
    } else {
      setSearchResults(data);
    }
  };
  const renderItemNodata = ({item}) => (
    <View>
      <Text style={styles.txtHeader_two}>{languageKey(item.header)}</Text>
      <Text style={styles.txtContent}>{languageKey(item.content)}</Text>
      <SvgXml xml={item.svg} style={styles.imgEmpty} />
    </View>
  );
  const _keyExtractor = (item, index) => `${item.OID}-${index}`;
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.ID || item?.Version}
        disabled={false}
        onPress={() => handleSelection(item)}
        style={index === data.length - 1 ? styles.cardNoBorder : styles.card}>
        <Text bold style={styles.title}>
          {opstreeNameStatus === true
            ? item?.StatusName
            : optreeValue === true
            ? item?.Name
            : optree === true
            ? item?.TreeName
            : item.nPLRegionsName || item?.Name || item?.Version}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (maintenance===true&&value===undefined)&&setSearchResults(data);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
      <View>
        <Text style={styles.label}>{title}</Text>
        <Button
          disabled={true}
          style={styles.container}
          onPress={openShowModal}>
          <View style={styles.header}>
            <Text style={value ? styles.placeholder_two : styles.placeholder}>
              {value ? value : title}
            </Text>
            <View>
              <SvgXml xml={arrow_down} width="14" height="14" />
            </View>
          </View>

          <Modal
            useNativeDriver
            backdropOpacity={0.5}
            isVisible={ishowModal}
            style={styles.optionsModal}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            hideModalContentWhileAnimating>
            <KeyboardAvoidingView
              style={styles.optionsModalContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View
                style={[
                  styles.headerContent_gray,
                  {marginTop: keyboardHeight ? 150 : 0},
                ]}>
                {treeModule === true && (
                  <View style={styles.btnCloseTree}></View>
                )}
                <Text style={styles.titleModal}>{title}</Text>
                <View
                  style={
                    optree === true
                      ? styles.contentBodyTree
                      : styles.contentBody
                  }
                />
                <Button onPress={closeModal} style={styles.btnClose}>
                  <SvgXml width="14" height="14" xml={close} />
                </Button>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.search}>
                  <SearchBar
                    value={searchText}
                    onChangeText={text => {
                      setSearchText(text);
                      onChangeText(text);
                    }}
                  />
                </View>
                <ScrollView
                  style={styles.containerRadio}
                  showsVerticalScrollIndicator={false}>
                  <RadioProvince
                    data={
                      searchResults?.length > 0 ? searchResults : searchResults
                    }
                    handleCloseModal={closeModal}
                    setValue={setValue}
                    optree={optreeValue === false ? true : false}
                    optreeValue={optree === false ? true : false}
                    opstreeNameStatus={opstreeNameStatus}
                    cacheSelectTree={value}
                    opreportDT={opreport === true ? true : false}
                  />
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </Button>
      </View>,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <Button
        disabled={disabled}
        style={[
          setisEror === true && value === undefined
            ? styles.containerError
            : styles.container,
          {paddingHorizontal: treeModule === true ? scale(12) : scale(16)},
        ]}
        onPress={openShowModal}>
        <View style={styles.header}>
          <Text
            style={listRecommend ? styles.placeholder_two : styles.placeholder}>
            {value ? value : title}
          </Text>
          <View>
            <SvgXml xml={arrow_down} width="14" height="14" />
          </View>
        </View>

        <Modal
          useNativeDriver
          backdropOpacity={0.5}
          isVisible={ishowModal}
          style={styles.optionsModal}
          onBackButtonPress={closeModal}
          onBackdropPress={closeModal}
          hideModalContentWhileAnimating>
          <KeyboardAvoidingView
            style={styles.optionsModalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <View
              style={[
                styles.headerContent_gray,
                {marginTop: keyboardHeight ? 150 : 0},
              ]}>
              {treeModule === true && <View style={styles.btnCloseTree}></View>}
              <Text style={styles.titleModal}>{title}</Text>
              <View
                style={
                  optree === true ? styles.contentBodyTree : styles.contentBody
                }
              />
              <Button onPress={closeModal} style={styles.btnClose}>
                <SvgXml width="14" height="14" xml={close} />
              </Button>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.search}>
                <SearchBar
                  value={searchText}
                  onChangeText={text => {
                    setSearchText(text);
                    onChangeText(text);
                  }}
                />
              </View>
              <ScrollView
                style={styles.containerRadio}
                showsVerticalScrollIndicator={false}>
                {maintenance === true && searchResults?.length === 0 ? (
                  <FlatList
                    data={[
                      {
                        id: '1',
                        header: '_no_data',
                        content: '_we_will_back',
                        svg: noData,
                      },
                    ]}
                    renderItem={renderItemNodata}
                    keyExtractor={item => item.id}
                    style={[
                      styles.flatlist,
                      {marginLeft: (width - 196 - 32) / 2},
                    ]}
                  />
                ) : (
                  <RadioProvince
                    data={
                      maintenance === true
                        ? searchResults || data
                        : searchResults?.length > 0
                        ? searchResults
                        : data
                    }
                    handleCloseModal={closeModal}
                    setValue={setValue}
                    optree={optreeValue === false ? true : false}
                    optreeValue={optree === false ? true : false}
                    opstreeNameStatus={opstreeNameStatus}
                    cacheSelectTree={value}
                    opreportDT={opreport}
                  />
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Button>
      {setisEror === true && value === undefined && (
        <View>
          <Text style={styles.error}>
            {languageKey('_please_select_required')}
          </Text>
        </View>
      )}
      {listRecommend === true && (
        <View style={styles.listRec}>
          <FlatList
            data={data}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            horizontal={true}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            style={styles.flatlist}
            ListFooterComponent={<View style={styles.view600}></View>}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: colors.black,
    borderRadius: scale(8),
    fontSize: fontSize.size14,
    height: hScale(38),
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: '#F9F9FB',
    paddingLeft: scale(16),
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
  containerError: {
    color: colors.black,
    borderRadius: scale(8),
    fontSize: fontSize.size14,
    height: hScale(38),
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: colors.red,
    backgroundColor: '#F9F9FB',
    paddingLeft: scale(16),
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
  optionsModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  optionsModalContainer: {
    height: height / 1.5,
    paddingBottom: scale(10),
  },
  contentContainer: {
    backgroundColor: colors.graySystem2,
    height: height / 1.5,
  },
  label: {
    color: colors.black,
    fontSize: fontSize.size14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    lineHeight: scale(22),
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(6),
    color: '#6B6F80',
    fontSize: fontSize.size14,
    fontFamily: 'Inter-Regular',
    lineHeight: scale(22),
    fontWeight: '400',
  },
  placeholder_two: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(6),
    color: '#6B6F80',
    fontWeight: '400',
    fontSize: fontSize.size14,
    fontFamily: 'Inter-Regular',
    lineHeight: scale(22),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent_gray: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: hScale(46),
    paddingHorizontal: scale(16),
    backgroundColor: colors.red,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
  },
  titleModal: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: scale(24),
    textAlign: 'center',
    flex: 1,
  },
  containerRadio: {
    borderRadius: scale(12),
    marginHorizontal: scale(16),
  },
  search: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    marginTop: scale(16),
  },
  btnClose: {
    padding: scale(10),
  },
  contentBodyTree: {
    paddingRight: 0,
  },
  btnCloseTree: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
  cardNoBorder: {
    flexDirection: 'row',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginRight: scale(8),
    borderRadius: scale(6),
    backgroundColor: colors.graySystem2,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginRight: scale(8),
    borderRadius: scale(6),
    backgroundColor: colors.graySystem2,
  },
  flatlist: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.size14,
    lineHeight: scale(22),
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
  },
  error: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.size14,
    lineHeight: scale(22),
    fontWeight: '500',
    color: colors.red,
  },
  listRec: {
    marginTop: scale(8),
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
  view600: {
    height: scale(8),
  },
  txtHeader_two: {
    color: colors.black,
    fontSize: fontSize.size16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    alignSelf: 'center',
    fontStyle: 'normal',
    lineHeight: scale(24),
    marginTop: scale(16),
  },
  txtContent: {
    marginTop: scale(4),
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    fontSize: fontSize.size14,
    lineHeight: scale(22),
  },
});

export default CardModal;
