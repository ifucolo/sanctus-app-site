const environment = process.env.NODE_ENV || "development";
const { parsed: localEnv, error } = require('dotenv').config({ path: `config/${environment}.env` });
const webpack = require('webpack');
const withFonts = require('next-fonts');
const withSourceMaps = require('@zeit/next-source-maps');

if (error) {
  throw error;
}

const next = {
  enablesvg: true,
  pageExtensions: ['mdx', 'jsx', 'ts', 'tsx'],
  webpack: (config, { dev }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.(js?x)$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader',
    //     options: {},
    //   });
    //   config.module.rules.push({
    //     test: /\.(ttf|eot|woff|woff2|svg)$/,
    //     exclude: /node_modules/,
    //     loader: 'file-loader',
    //     options: {},
    //   });
    // }

    return config;
  },
  distDir: 'build',
  assetPrefix: localEnv.ASSETS_URL || '',
  exportPathMap: () => {
    return {};
  }
};

module.exports = withSourceMaps(withFonts(next));
