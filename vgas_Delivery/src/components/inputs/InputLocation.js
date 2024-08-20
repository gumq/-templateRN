import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { gps } from '../../svgImg'
import Text from '../Text';
import Button from '../buttons/Button';
import { colors, fontSize } from '../../themes';
import { hScale, scale } from '../../utils/resolutions';

const InputLocation = (
  {
    label,
    name,
    value,
    style,
    errors,
    touched,
    handleChange,
    handleBlur,
    placeholderInput,
    labelHolder,
    onPress,
    bgColor,
    height,
    textColor,
    tree = false,
    disable,
    ...rest
  },
  ref,
) => {
  return (
    <View {...{ style }}>
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}
      <View>
        <TextInput
          ref={ref}
          {...rest}
          editable={!disable}
          value={(tree === true && value === ', ') ? '' : value}
          autoCapitalize="none"
          style={[styles.input, { paddingHorizontal: tree === true ? scale(12) : scale(16), height: height ? height : hScale(38), backgroundColor: bgColor ? bgColor : colors.white }]}
          placeholder={placeholderInput ? labelHolder : ''}
          placeholderTextColor={colors.graySystem}
        />
        {placeholderInput && (
          <View style={styles.placeholder} >
            <Button disabled={disable} onPress={onPress} style={styles.btnShowPW}>
              <SvgXml width="16" height="16" xml={gps} />
            </Button>
          </View>
        )}
      </View>
      {errors && touched && touched[name] && errors[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: colors.black,
    borderRadius: scale(8),
    fontSize: fontSize.size14,
    height: hScale(46),
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: colors.white,
    paddingHorizontal: scale(16)
  },
  btnShowPW: {
    right: 0,
    bottom: - 4,
    position: 'absolute',
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
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
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: scale(8),
    bottom: scale(8),
    width: '100%',
  },
});

export default InputLocation;
