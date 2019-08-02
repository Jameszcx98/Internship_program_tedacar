import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import moment from 'moment';
import language from './common/languages'

import store from './store'

Vue.use(VueI18n);

// if you are using moment in your project, now is a good time
// to set its locale also
// moment.locale(locale);

const i18n = new VueI18n({   // 国际化
  locale: store.state.lang,  
  messages: language,
  silentTranslationWarn: false
}) 

export default i18n;
