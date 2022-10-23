const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const distDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const plugins = [
    new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'app/assets/**',
                    to: `${distDir}/assets/[name].[ext]`,
                    context: srcDir,
                    globOptions: {
                        ignore: [`${srcDir}/app/assets/manifest.json`]
                    }
                },
                {
                    from: 'app/assets/manifest.json',
                    to: `${distDir}/[name].[ext]`,
                    context: srcDir,
                    toType: "template"
                }
            ],
        },
        {
            copyUnmodified: false
        }
    )
];
const commonWebpackConfiguration = {
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    // devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    // performance: options.performance || {},
    // optimization: {
    //     minimize: false
    // }
    watchOptions: {
        ignored: ['node_modules'],
        poll: 500
    }
};

module.exports = (env, argv) => {
    let backgroundPlugins = [...plugins];
    const {mode} = argv;

    if (mode === 'production') {
        // backgroundPlugins.unshift(new CleanWebpackPlugin());
        commonWebpackConfiguration.optimization = {
            minimize: true,
            minimizer: [
                () => ({
                    sourceMap: false,
                    parallel: true,
                    cache: true,
                    // https://github.com/terser-js/terser#minify-options
                    terserOptions: {
                        ecma: 8,
                        compress: {
                            drop_console: true,
                            drop_debugger: true // TODO: find out why it does not work
                        }
                    }
                })
            ]
        };
    }

    return [
        {
            entry: './src/app/background/background.js',
            output: {
                path: distDir,
                filename: 'background/main.js'
            },
            mode,
            plugins: backgroundPlugins,
            ...commonWebpackConfiguration
        },
        {
            entry: './src/app/content/content.js',
            output: {
                path: distDir,
                filename: 'content/main.js'
            },
            mode,
            plugins,
            ...commonWebpackConfiguration
        }
    ];
};