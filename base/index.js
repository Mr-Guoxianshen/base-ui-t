import ElementUI from 'element-ui'

import { CImportA, CImport } from './components/c-import';

const components = {
    CImportA,
    CImport,
};

const install = function(Vue) {
    if (install.installed) return;
    Vue.use(ElementUI);
    Object.keys(components).forEach(function(key) {
        Vue.component(key, components[key]);
    });
};

const API = {
    install: install,
    version: '0.0.1',
};

export default API;
