import React from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

import { fontSize } from '../themes';
import { scale } from '../utils/resolutions';

const Text = ({ bold, style, children, ...rest }) => {
  return (
    <RNText
      {...rest}
      style={[styles.text, bold ? styles.bold : styles.regular, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.size14,
    lineHeight: scale(20),
  },
  bold: {
    fontWeight: '700',
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
  regular: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
});

export default React.memo(Text);
