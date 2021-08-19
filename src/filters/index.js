// src/filters/index.js

import Vue from 'vue';
import moment from 'moment';

// 自定义过滤器
Vue.filter('dateFormat', (value, formatStr = 'YYYYMMDD') => moment(value).format(formatStr));
