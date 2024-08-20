import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import { colors, fontSize } from '../themes';

const Nodata = () => {

  return (
    <View style={styles.noData}>
      <Text style={styles.titleNoData}>Không có dữ liệu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleNoData: {
    color: colors.black,
    fontSize: fontSize.size16,
    fontStyle: 'italic',
  },
});

export default Nodata;
