# base-ui `业务组件库`
@(ui相关)[2019.12.19]

----------

前言:  项目始建于 2019.12.19, 旨在创建公司业务组件库!

#### 项目说明
涉及技术栈:  vue + vuex + vue-router + element-ui + scss
引入方式:  以 git submodule 方式添加,  以 vue 插件形式在 main.js 内引入 
##### 示例:
首次添加执行:
```
git submodule add https://github.com/Mr-Guoxianshen/base-ui-t.git base
```
组件库更新执行:
```
git submodule update
```
main.js 文件添加代码:
```
import BaseUi from '../base/base';
Vue.use(BaseUi);
```

#### 项目配置及运行
```
npm install
npm run serve
npm run build
npm run lint
```

#### 项目目录说明
本文只对组件库文件加以说明, 项目其他文件不做说明
##### 项目目录:
![Image text](../pic/concurrent/aa.jpg)
##### 目录说明:
base 对外目录
&emsp;assets 静态资源目录
&emsp;components 组件目录
&emsp;filters 全局过滤器文件目录
&emsp;styles 样式文件目录
&emsp;utils 工具方法目录
&emsp;index.js

#### 代码规范
**命名规范**: 
c: 代指 common (统一命名前缀)
a: 代指 admin (管理端特殊组件命名后缀)
s: 代指 student (学生端特殊组件命名后缀)
t: 代指 teacher (教师端特殊组件命名后缀)
- 组件文件/文件夹命名:  命名应具有语义在里面,  这里组件统一以 **c-** 开头, 例: c-menus; 多单词组件中间以**下划线**连接, 例: c-card-list; 某一段特殊组件命名例: c-menus-s;
- 函数/变量/常量命名: 避免使用单字母等语义不明确命名, 多单词命名使用**驼峰命名法**, 其中应用常量命名**首字母需大写**;

**代码规范**: 
- 编码尽量使用**ES6**最新规范
- 一般组件实例选项顺序规则: 
```
- name
- components 
- directives 
- filters 
- props    
- data  
- computed 
- watch  
- created
- mounted
- activited
- update
- beforeRouteUpdate
- methods   
```

**注释规范**: 
- 公共函数注释规范: 函数描述使用 description, 参数使用 param,  注明返回的类型和值; 包装 API 函数须用 * 注明是否必传; 例:
```
/**
 * @description 是否为空对象
 * @param object
 * @returns { Boolean }
 */
function isEmptyObject(v) {
    return Object.keys(v).length;
}
/**
 * @description 添加考试
 * @param examName *
 * @param orgId
 * @returns { promise }
 */
export function addExam(params) {
    return axios.post(`${base}/exam/save`)
}
```

相信看到这里, 你应该会对这个项目有了一定了解, 也应该明白, 这并不是一个真正意义上的基础组件库, 只是在一定基础上对业务组件做了封装. 笔者限于自身精力、时间, 不能真正的搭建出公司的组件库. 也许有一天笔者不在沐华清诚工作了, 也希望后来者能继续为了沐华清诚前端技术发展做一份努力, 直到有一天真正拥有属于自己的基础组件库!