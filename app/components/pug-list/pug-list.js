(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(
      require('jquery'),
      require('../jquery/plugins/plugins.js')
    );
  } else {
    factory(jQuery, peppers.plugins);
  }
}(function ($, plugins) {
  plugins.registerPlugins(
    {
      "name": "pugList",
      "Constructor": PugList,
      "selector": ".pug-list"
    }
  );

  function PugList($element) {
    this.init = function(params){
      
    };
  }
}));