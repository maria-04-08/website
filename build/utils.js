const utils = {
  getParams(key) {
    const params = process.argv.slice(2);

    if (key) return params.find(param => param == key);
  
    return params;
  },
  getPort() {
    const RE = /port/ig;
    const portConfig = utils.getParams().find(param => RE.test(param));
    let port = '';

    if (portConfig) {
      port = portConfig.split('=')[1];
    }
    
    return port;
  },
  htmlModulePath(ENV) {
    return {
      meta: `src/common_page/base/meta.html`,
      css: [`src/common_page/base/css.html`],
      script: `src/common_page/${ENV}/script.html`,
    }
  }
}

module.exports = utils;
