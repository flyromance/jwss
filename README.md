### caozuo

yarn install --registry=http://registry.npm.taobao.org


### lerna 
- 通过lerna的命令lerna bootstrap 将会把代码库进行link
- 通过lerna publish发布最新改动的库
- lerna init --independent 默认是fixed
- lerna.json 
  - version: independent 每个包独立版本
  - version: 0.0.1 固定模式，所有包都是统一版本

### cli

- 用于创建项目
- 启动 server
- 打包编译

```
# 创建项目
jws new xxx --name

# 构建和服务
jws start --dev

# 构建
jws build --dev

# 服务
jws server --dev
```

### server

- 服务端功能
