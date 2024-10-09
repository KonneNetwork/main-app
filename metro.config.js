const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);
//   config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
//   config.resolver.sourceExts.push('svg');
//   return withNativeWind(config, { input: './global.css' });
// })();

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"]
//   };

//   return withNativeWind(config, { input: './global.css' });
// })();
/** @type {import('expo/metro-config').MetroConfig} */
module.exports = () => {
  const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
  });

  config.resolver.sourceExts.push('cjs');

  const { transformer, resolver } = config;

  const {
    resolver: { sourceExts },
  } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'mjs'],
  };

  return withNativeWind(config, { input: './global.css' });
}