# welcome-2020

## 整体结构

为了方便只展示 src 目录下的文件。图片文件夹只展示具体文件夹，不展示具体文件。

```$xslt
.
├── App.vue
├── assets
│   ├── font
│   │   ├── MFTONGXIN_NONCOMMERCIAL-REGULAR.TTF
│   │   └── MFXINGYAN_NONCOMMERCIAL-REGULAR.TTF
│   ├── img
│   │   ├── basic-info
│   │   ├── canteen
│   │   ├── canteen-lead
│   │   ├── college-brief
│   │   ├── component
│   │   │   ├── cloud
│   │   │   └── viewpager
│   │   ├── dorm
│   │   ├── dorm-lead
│   │   ├── dormitory
│   │   ├── fourth-page
│   │   ├── hobby
│   │   ├── home
│   │   ├── icons
│   │   ├── loading
│   │   ├── long-page
│   │   └── second-page
│   ├── message
│   │   ├── canteen.json
│   │   └── data.txt
│   └── styles
│       ├── animation.css
│       ├── animation.css.map
│       ├── animation.less
│       ├── font.css
│       ├── mixins.css
│       ├── mixins.css.map
│       ├── mixins.less
│       ├── variables.css
│       ├── variables.css.map
│       └── variables.less
├── components
│   ├── Animate.vue
│   ├── ButtonBox.vue
│   ├── Cloud.vue
│   ├── Picker.vue
│   ├── Player.vue
│   ├── Swiper.vue
│   ├── Upglide.vue
│   ├── ViewPager.vue
│   ├── basic-info
│   │   ├── Content.vue
│   │   └── Title.vue
│   ├── canteen-lead
│   │   ├── CanteenContainer.vue
│   │   └── Title.vue
│   ├── college-brief
│   │   ├── CollegeContent.vue
│   │   └── Title.vue
│   ├── dorm
│   │   ├── Container.vue
│   │   └── Title.vue
│   ├── dorm-lead
│   │   ├── DormContainer.vue
│   │   └── Title.vue
│   └── hobby
│       └── Title.vue
├── main.js
├── router
│   └── index.js
├── server
│   └── index.js
├── utils
│   ├── countDown.js
│   ├── data.js
│   ├── loading.js
│   ├── slideChange.js
│   ├── throttle.js
│   └── util.js
└── views
    ├── BasicInfo.vue
    ├── Canteen.vue
    ├── CanteenLead.vue
    ├── CollegeBrief.vue
    ├── Dorm.vue
    ├── DormLead.vue
    ├── FirstPage.vue
    ├── FourthPage.vue
    ├── Hobby.vue
    ├── Loading.vue
    ├── LongPage.vue
    └── SecondPage.vue
```

## 技术栈

+ vue
+ vue-router
+ axios
+ swiper

## 项目运行

+ 使用 Vue Cli 创建，按照标准即可完成

## 注意点

1. 在Vue中，如果想要刷新当前页面，不建议使用`this.$router.go(0)`，建议使用`location.load()`。这个方法在本项目中ios端会失效。但是在PC端和安卓是可以触发的。

2. 物理引擎使用的是`matter.js`, 获取手机重力使用的是github上的一个封装库--[oritnter.js](https://github.com/shrekshrek/orienter)
  + 首先，`matter.js`的官方文档，建议重构
  + 其次，`oritnter.js`这个库里所使用的方法有一些是需要在https协议下才能生效，这点特别坑！

3. 
  
## 接口文档

https://documenter.getpostman.com/view/12012080/TVRoWRLa

## 参与项目成员

+ 毛尧俊

## 项目上线时间

+ 2020年月日

## 项目的线上地址

https://wx.redrock.team/game/redrock-20th/  
https://redrock.team/game/redrock-20th/

## 代码的 GitHub/GitLab 地址

+ github: https://github.com/myjdml/redrock-20th/
+ gitlab: https://gitlab.redrock.team/web/redrock-20th/

