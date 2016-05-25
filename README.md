# blizzard

这是模拟 <守望者先锋> 官网

# 目录结构

```
├── README.md
├── TODO.md
├── bower.json  # 管理第三方包
├── bower_components # 第三方包目录
├── dist # 生产目录
│   ├── css
│   ├── fonts
│   ├── home
│   ├── images
│   ├── index.html
│   └── js
├── gulp
├── gulpfile.js
├── old
├── package.json
├── rev
│   ├── js
│   └── vendor
└── src  #项目源码
    ├── css
    ├── fonts
    ├── html
    ├── icon
    ├── images
    ├── index.html
    ├── js
    ├── less
    └── lib

```

# 安装

```
npm install
```

# 开发环境

`cp .example.env .env` 并且设置环境变量

```
npm run dev
```

# 发布


`cp .product.env .env` 并且设置环境变量



```
npm run production
```
