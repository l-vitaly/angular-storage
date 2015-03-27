angular-storage
=============================

This service allows you to create session or local storage, but if there is no support, then the cookie will be used

## Install

`bower install dt-angular-storage`

`bower install angular-cookies`

## Documentation

Include `angular-cookies.js` and `angular-storage.js` (or `angular-storage.min.js`) in your `index.html`, after including Angular itself.

Add `'AngularStorage'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>

</head>
<body>
    ...
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>
    <script src="bower_components/js/dt-angular-storage/dist/angular-storage.min.js"></script>
    ...
    <script>
        angular.module('app', ['AngularStorage']);
    </script>
    ...
</body>
</html>
```

Return the session or local storage (getStorage)

**Returns** `sessionStorage`
```js
app.controller('MainController', function($scope, storageService) {
  //...
  var webStorage = storageService.getStorage('session');

  webStorage.setItem('testValue', 'test')

  console.log(webStorage.getItem('testValue'));

  //...
});
```

**Returns** `localStorage`
```js
app.controller('MainController', function($scope, storageService) {
  //...
  var webStorage = storageService.getStorage('local');

  webStorage.setItem('testValue', 'test')

  console.log(webStorage.getItem('testValue'));

  //...
});
```

If local or session storage not supported then method `'getStorage'` return CookieStorage object.

CookieStorage has exists methods:

- getItem(key)
- setItem(key, value, options) - options see https://docs.angularjs.org/api/ngCookies/provider/$cookiesProvider#defaults
- removeItem(key)
- clear