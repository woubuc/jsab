
/*
jsAB by woubuc | github.com/woubuc/jsAB
Inspired by easyAB by _srom | srom.github.io/easyAB
 */
(function($) {
  var _cookieName, _readCookie, _render, _setCookie, _version;
  _cookieName = 'jsab_version';
  _version = null;
  _setCookie = function(value) {
    var date, expires;
    date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
    return document.cookie = _cookieName + '=' + value + expires + '; path=/';
  };
  _readCookie = function() {
    var cookies, i, j, len, name;
    name = _cookieName + '=';
    cookies = document.cookie.split(';');
    for (j = 0, len = cookies.length; j < len; j++) {
      i = cookies[j];
      while (i.charAt(0) === ' ') {
        i = i.substring(1, i.length);
      }
      if (i.indexOf(name) === 0) {
        return i.substring(name.length, i.length);
      }
    }
    return null;
  };
  _render = function(nodes) {
    return nodes.each(function() {
      var fn;
      if (_version.className) {
        $(this).addClass(_version.className);
      }
      if (_version.text) {
        $(this).text(_version.text);
      } else if (_version.html) {
        $(this).html(_version.html);
      }
      if (_version.version || _version.fn || _version["function"]) {
        fn = _version.version || _version.fn || _version["function"];
        return fn(this);
      }
    });
  };
  return $.fn.jsab = function(options) {
    var defaultVersion, devMode, index, send, version, versions;
    if (!options || typeof options !== 'object' || !navigator.cookieEnabled) {
      return;
    }
    devMode = window.location.hash.indexOf('!dev') !== -1;
    index = options.index || options.dimension || options.dimensionIndex;
    if (!index) {
      return;
    }
    defaultVersion = options.defaultVersion || options["default"];
    if (!defaultVersion) {
      return;
    }
    versions = options.versions || options.alternatives;
    if (!versions) {
      return;
    }
    if (options.id != null) {
      _cookieName += '_' + options.id;
    }
    versions.unshift({
      name: defaultVersion
    });
    if (!devMode) {
      version = _readCookie();
    }
    if (!version) {
      version = Math.floor(Math.random() * versions.length);
      if (!devMode) {
        _setCookie(version);
      }
    }
    _version = versions[version];
    window.ga('set', 'dimension' + index, _version.name);
    _render(this);
    send = (function() {
      switch (false) {
        case options.send == null:
          return options.send;
        case options.sendPageview == null:
          return options.sendPageview;
        case options.pageview == null:
          return options.pageview;
        default:
          return true;
      }
    })();
    if (send) {
      return window.ga('send', 'pageview');
    }
  };
})(window['jQuery']);
