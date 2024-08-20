import { StyleSheet } from 'react-native';

import { scale } from '../../utils/resolutions';
import { fontSize } from '../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: scale(100),
  },
  contentFooter: {
    position: 'absolute',
    bottom: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFooter: {
    fontWeight: '400',
    fontSize: fontSize.size12,
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    textAlign: 'center',
    marginBottom: scale(8),
  },
  txtcopyright:{
    position: 'absolute', bottom: scale(16)
  }
});