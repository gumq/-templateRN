import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Text from '../Text';
import { Button } from '../buttons';
import { scale } from '../../utils/resolutions';
import { colors, fontSize } from '../../themes';

const TAB_WIDTH = Dimensions.get('window').width / 2.5;
const TAB_TWO = Dimensions.get('window').width / 2;

const TabsHeaderDevices = ({ data, selected, onSelect, style, tabWidth }) => {
  const flatListRef = useRef(null);

  const _keyExtractor = (item, index) => `${item.id}-${index}`;

  const _renderItem = ({ item }) => {
    let isSelected = item.id === selected.id;
    return (
      <Button
        key={item.id}
        style={[styles.btn, { width: tabWidth ? TAB_TWO : TAB_WIDTH }, isSelected && styles.btnActive]}
        onPress={() => {
          onSelect(item);
          const index = data.findIndex((i) => i.id === item.id);
          flatListRef.current.scrollToIndex({ index, animated: true });
        }}
      >
        <Text style={isSelected ? styles.textActive : styles.text}>
          {item.label}
        </Text>
      </Button>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btn: {
    width: TAB_WIDTH,
    alignItems: 'center',
    paddingVertical: scale(3),
    borderBottomWidth: 1,
    borderBottomColor: '#C8C8C8',
    backgroundColor: colors.white,
  },
  btnActive: {
    borderBottomColor: colors.red,
  },
  textActive: {
    fontWeight: '600',
    color: colors.red,
    fontSize: fontSize.size14,
    marginTop: scale(11),
    lineHeight: scale(22),
  },
  text: {
    fontWeight: '400',
    color: '#9CA0AF',
    fontSize: fontSize.size14,
    fontFamily: 'Inter-Regular',
    lineHeight: scale(22),
    marginTop: scale(11),
    marginBottom: scale(11),
  },
});

export default TabsHeaderDevices;
