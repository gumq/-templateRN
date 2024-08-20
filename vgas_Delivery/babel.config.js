module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          "@src": "./src",
          '@api': './src/actions/Api',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@views': './src/views',
          '@components': './src/components',
          '@routes': './src/screens/routes',
          '@resolutions': './src/utils/resolutions',
        },
      },
    ],
  ],
};
