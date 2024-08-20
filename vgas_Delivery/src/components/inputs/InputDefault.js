import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

import Text from '../Text';
import { hScale, scale } from '../../utils/resolutions';
import { colors, fontSize } from '../../themes';

const InputDefault = ({
  label,
  name,
  values,
  style,
  errors,
  touched,
  handleChange,
  handleBlur,
  onChangeText,
  labelHolder,
  bgColor,
  isEdit = false,
  textColor = false,
  listRecommend,
  setFieldValue,
  tree = false,
  keyboardType,
  ...rest
}) => {
  const handleSelection = (item) => {
    setFieldValue(name, item);
    values = item;
  };
  return (
    <View style={[style]}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View >
        <TextInput
          editable={isEdit}
          multiline={true}
          value={values}
          keyboardType={keyboardType ? keyboardType : "default"}
          onBlur={handleBlur(name)}
          placeholder={labelHolder}
          textAlignVertical={tree===true&&values?.length>45?"top":"center"}
          placeholderTextColor={colors.graySystem}
          onChangeText={handleChange(name)}
          style={[
            tree === true ? (values?.length>132?styles.inputTreeBigest:values?.length>45?styles.inputTreeBig:styles.inputTree) : styles.input,
            {
              color: textColor ? colors.gray600 : isEdit ? colors.black : colors.graySystem,
              backgroundColor: bgColor ? bgColor : colors.white
            },
          ]}
          {...rest}
        />
        {errors && touched && touched[name] && errors[name] ? (
          <Text style={tree === true ? styles.errorTree : styles.error}>{errors[name]}</Text>
        ) : null}
      </View>
      {listRecommend && <View style={styles.listRec}>
        {listRecommend?.MaxEvenNumber && <TouchableOpacity
          disabled={false}
          onPress={() => handleSelection(listRecommend?.MaxEvenNumber)}
          style={styles.cardNoBorder}>
          <Text style={styles.title}>
            {listRecommend?.MaxEvenNumber}
          </Text>
        </TouchableOpacity>}
        {listRecommend?.MaxOddNumber && <TouchableOpacity
          disabled={false}
          onPress={() => handleSelection(listRecommend?.MaxOddNumber)}
          style={styles.cardNoBorder}>
          <Text style={styles.title}>
            {listRecommend?.MaxOddNumber}
          </Text>
        </TouchableOpacity>}
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    fontSize: fontSize.size14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    lineHeight: scale(22)
  },
  title: {
    color: colors.black,
    fontSize: fontSize.size14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  input: {
    color: colors.black,
    borderRadius: scale(8),
    paddingLeft: scale(10),
    fontSize: fontSize.size14,
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: colors.white,
    height: hScale(38)
  },
  inputTree: {
    color: colors.black,
    borderRadius: scale(8),
    paddingLeft: scale(12),
    fontSize: fontSize.size14,
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: colors.white,
    height: hScale(38), paddingTop: scale(Platform.OS === 'ios' ? 10 : 10)
  },
  inputTreeBig: {
    color: colors.black,
    borderRadius: scale(8),
    paddingLeft: scale(12),
    paddingRight: scale(8),
    fontSize: fontSize.size14,
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: colors.white,
    height: hScale(38*1.8),
  },
  inputTreeBigest: {
    color: colors.black,
    borderRadius: scale(8),
    paddingLeft: scale(12),
    paddingRight: scale(8),
    fontSize: fontSize.size14,
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: '#D1D3DB',
    backgroundColor: colors.white,
    height: hScale(38*3),
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.size10,
    marginTop: scale(5),
  },
  errorTree: {
    color: colors.red,
    fontSize: fontSize.size14,
    marginTop: scale(5),
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  listRec: {
    marginTop: scale(8),
    height: 'auto',
    width: 'auto',
    flexDirection: 'row'
  },
  cardNoBorder: {
    flexDirection: 'row',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginRight: scale(8),
    borderRadius: scale(6),
    backgroundColor: colors.graySystem2,
  },
});

export default InputDefault;
