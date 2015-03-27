(function () {
  'use strict';

  angular.module('AngularStorage', ['ngCookies'])
    .provider('storageService', StorageService)
  ;

  function StorageService() {

    this.$get = ['$window', '$cookieStore', function(windowService, cookieService) {
      return {
        getStorage: getStorage
      };

      function getStorage(type) {

        if(type === 'local' && supportStorage('localStorage')) {
          return windowService.localStorage;
        }

        if(type === 'session' && supportStorage('sessionStorage')) {
          return windowService.sessionStorage;
        }

        return new CookieStorage(cookieService);
      }

      function supportStorage(storageType) {
        try {
          var supported = (storageType in windowService && windowService[storageType] !== null);
          var key = 'supportStorage_' + Math.round(Math.random() * 1e7);

          if (supported) {
            windowService[storageType].setItem(key, '');
            windowService[storageType].removeItem(key);
          }
          return supported;
        } catch (e) {
          return false;
        }
      }

    }];
  }

  function CookieStorage(cookieService) {

    this.getItem = getItem;
    this.setItem = setItem;
    this.removeItem = removeItem;
    this.clear = clear;

    function getItem(key) {
      var value = cookieService.get(key);
      return angular.isUndefined(value) ? null : value;
    }

    function setItem(key, value, options) {
      cookieService.put(key, value, options);
    }

    function removeItem(key) {
      cookieService.remove(key);
    }

    function clear() {
      var allItems = cookieService.getAll();

      for (var key in allItems) {
        cookieService.remove(key);
      }
    }
  }

})();