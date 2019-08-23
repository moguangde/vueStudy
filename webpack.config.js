const path=require('path')

//启用热更新的第二步
const webpack=require('webpack')

//导入在内存中生成HTML页面的插件
//只要是插件。都要放到plugins节点中去
//这个插件的两个作用
//1、自动在内存中根据指定页面生成一个内存的页面
//2、自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin=require('html-webpack-plugin')

//. Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//这个配置文件，起始就是一个JS文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports={

    entry:path.join(__dirname,'./src/main.js'),//入口，表示使用webpack打包哪个文件

      output:{//输出文件相关的配置
        path:path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js'//这是指定输出的文件的名称
      },
      devServer:{
        //这是配置dev-server命令参数的第二种形式，相对来说这种方式麻烦一些

        //--open --port 3000 --contentBase src --hot
        open:true,//自动打开游览器
        port:8080,//设置启动时候的运行端口
        // contentBase:'src',//指定托管的根目录
        hot:true//启用热更新的第一步
      },
      plugins:[
        //配置插件的节点
       new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象，这是启动热更新第三步
       
       
       new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
          template:path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
          filename:'index.html'//指定生成的页面的名称
        
        
        
        }),
        new VueLoaderPlugin(),

      ],
      module:{
        //这个节点用于配置所有的第三方模块加载器
        rules:[
            //所有第三方匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//这个是配置处理.css文件的第三方loader规则
       
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //这是处理.less文件的第三方loader规则

            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
             //这是处理.scss文件的第三方loader规则

             {test:/.(jpg|pen|gif|bmp|jpeg)$/,use:'url-loader?limit=15830&name=[hash:8]-[name].[ext]'},
             //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或者等于给定的limit值，则不会转换为base64格式的字符串，如果图片
             //小于给定的limit值，则会转为base64的字符串

             {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件



             
             {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//这是配置babel来转换高级ES语法
          
          
            {test:/\.vue$/,use:'vue-loader'}//配置.vue文件的loader
            ]
      },

      resolve:{
        alias:{//修改vue被导入时候的包的路径
          // 'vue$':"vue/dist/vue.js"
        }
      }
}


//我们在控制台直接输入webpack --mode development命令执行的时候，webpack做了以下几步：

//1、首先，webpack发现，我们并没有通过命令的形式，给它指定入口和出口
//2、webpack就会去项目的跟目录中，查找一个叫做webpack.config.js的配置文件
//3、当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完成配置文件后，就会得到了配置文件中，导出的配置对象
//4、当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建