import { StyleSheet, Dimensions } from 'react-native';

import { colors, fontSize } from '../../themes';
import { scale, hScale } from '../../utils/resolutions';

const INPUT_HEIGHT = Dimensions.get('window').height;

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  imgBackground: {
    flex: 1,
    backgroundColor: colors.red
  },
  scrollview: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    marginTop: scale(24)
  },
  logo: {
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: scale(30),
    height: INPUT_HEIGHT,
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
  },
  input: {
    marginBottom: scale(16),
  },
  bodyInput: {
    marginHorizontal: scale(16),
    marginTop: scale(16)
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    height: hScale(38),
    backgroundColor: colors.red,
  },
  btnNext: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    height: hScale(38),
    marginTop: scale(16),
    backgroundColor: colors.red,
  },
  textLoginBtn: {
    color: colors.white,
    fontWeight: '600',
    fontSize: fontSize.size16,
    fontFamily: 'Inter-SemiBold',
    fontStyle: 'normal'
  },
  forgotPass: {
    color: colors.orange,
    fontWeight: '600',
    fontSize: fontSize.size14,
    fontFamily: 'Inter-SemiBold',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: scale(16)
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(8)
  },
  noAccount: {
    color: colors.black,
    fontSize: fontSize.size14,
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  createAccount: {
    color: colors.orange,
    fontWeight: '600',
    fontSize: fontSize.size14,
    fontFamily: 'Inter-SemiBold',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  contentFooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: height - 500,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txtFooter: {
    fontWeight: '400',
    fontSize: fontSize.size12,
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    textAlign: 'center',
    marginBottom: scale(8),
  },
  optionsModal: {
  },
  blurBackground: {
    borderRadius: scale(24),
    overflow: 'hidden',
  },
});
