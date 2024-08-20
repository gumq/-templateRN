import React from 'react';
import { View, StyleSheet, TextInput,Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

import { search } from '../svgImg'
import { scale } from '../utils/resolutions';
import { colors, fontSize } from '../themes';
import { translateLang } from '../store/accLanguages/slide';

const SearchBar = ({ style, tree=false,...rest}) => {
  const languageKey = useSelector(translateLang);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchIcon}>
        <SvgXml xml={search} />
      </View>
      <TextInput
        placeholder={languageKey('_search')}
        style={tree===true?styles.textInputTree:styles.textInput}
        autoCapitalize="none"
        returnKeyType={'search'}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FB',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#D1D3DB'
  },
  searchIcon: {
    position: 'absolute',
    left: scale(12),
  },
  textInput: {
    flex: 1,
    paddingVertical: scale(5),
    color: colors.black,
    paddingLeft: scale(30),
    paddingRight: scale(8),
    fontSize: fontSize.size14,
    lineHeight: scale(22),
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  textInputTree: {
    flex: 1,
    paddingVertical: scale(5),
    color: colors.black,
    paddingLeft: scale(34),
    paddingRight: scale(8),
    fontSize: fontSize.size14,
    lineHeight: scale(22),
    fontWeight: '400',
    fontFamily: 'Inter-Regular',paddingBottom:scale(Platform.OS==='ios'?8:4)
  },
});

export default SearchBar;
