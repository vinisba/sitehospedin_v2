// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require("shakapacker");
const webpack = require("webpack");

const webpackConfig = generateWebpackConfig({
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      feather: "feather-icons/dist/feather.min",
    }),
  ],
});

module.exports = webpackConfig;
