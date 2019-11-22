const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
        fixBabelImports('import', {//配置上babel-plugin-import
            libraryName: 'antd',//针对的是andD
            libraryDirectory: 'es',//源码文件中的es文件夹
            style: true,//自动打包相关的css
        }),
        addLessLoader({//自定义antd主题
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' },//更改主题颜色
        }),
    );