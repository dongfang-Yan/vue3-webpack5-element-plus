import ElementUI from './ElementUI'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
locale.use(lang)
import './http';

export default {
  install: (app) => {
    app.use(ElementUI);
  }
}