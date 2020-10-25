import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import less from 'rollup-plugin-less';
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import postcssModules from 'postcss-modules'
import postcssPresetEnv from 'postcss-preset-env';

import fs from 'fs';
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: `./${pkg.main}`,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: `./${pkg.module}`,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    // less(),
    external(),
    postcss({
      // modules: true,
      plugins: [
        // simplevars(),
        // nested(),
        // postcssPresetEnv(),
        // cssnano(),
        // postcssModules({
        //   getJSON: function (cssFileName, json, outputFileName) {
        //     var path = require("path");
        //     var cssName = path.basename(cssFileName, ".css");
        //     var jsonFileName = path.resolve("./dist/" + cssName + ".json");
        //     fs.writeFileSync(jsonFileName, JSON.stringify(json));
        //   },
        // })
      ],
      // modules: true,
      extensions: ['.css', '.less'],
      use: [['less', {
        javascriptEnabled: true
      }]],
      // extract: 'bundle.css'
    }),
    // less(),

    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve({
      jail: './src',
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', '.less']
    }),
    commonjs()
  ]
}
