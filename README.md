# 服务人员 H5

## vite + vue3 + ts

## 启动： npm run dev

## 编译： npm run build:环境名称

## 建议使用 pnpm


### 注意事项：

> - 1.开发环境时需要修改 `utils/is` 中 `isDev()` 返回值，主要用来区分是不是采用浙里办环境
> - 2.适老化模式切换，通过修改 `utils/is` 中 `isCare()` 返回值,并且` App.vue ` 中在 ` isDev() == true ` 时,为非适老化，如有必要本地测试适老化，需进行修改

