
const webpack = require('webpack')
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path:path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
		rules: [
			{
				test: /\.jsx?$/,         // Match both .js and .jsx files
				exclude: /node_modules/,
				loader: "babel-loader",
                  options: {
                    presets: ['@babel/env', '@babel/react']
                  }
			},
            {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
		]
	}


}
