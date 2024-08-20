import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Text from '../Text';
import { colors, fontSize } from '../../themes';
import { hScale, scale, } from '../../utils/resolutions';

const InputLogin = (
  { value,
    label,
    name,
    style,
    errors,
    touched,
    handleChange,
    handleBlur,
    placeholderInput,
    labelHolder,
    ...rest },
  ref,
) => {
  return (
    <View {...{ style }}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <View>
        <TextInput
          ref={ref}
          {...rest}
          value={value}
          autoCapitalize="none"
          style={styles.input}
          onBlur={handleBlur(name)}
          onChangeText={handleChange(name)}
          placeholder={placeholderInput ? labelHolder : ''}
          placeholderTextColor={colors.graySystem}
        />
      </View>
      {errors && touched && touched[name] && errors[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: colors.black,
    borderRadius: scale(8),
    fontSize: fontSize.size14,
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: '#F9F9FB',
    paddingHorizontal: scale(16),
    height: hScale(38)
  },
  label: {
    color: colors.black,
    fontSize: fontSize.size14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    fontSize: fontSize.size14,
    lineHeight: scale(22)
  },
  error: {
    fontSize: fontSize.size12,
    color: colors.redSystem,
    marginTop: scale(8)
  },
});

export default React.forwardRef(InputLogin);
