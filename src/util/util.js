/* global L */

'use strict';

var handlebars = require('handlebars'),
  reqwest = require('reqwest');

/*
handlebars.registerHelper('if', function(v1, operator, v2, opts) {
  var isTrue = false;

  switch (operator) {
  case '===':
    isTrue = v1 === v2;
    break;
  case '!==':
    isTrue = v1 !== v2;
    break;
  case '<':
    isTrue = v1 < v2;
    break;
  case '<=':
    isTrue = v1 <= v2;
    break;
  case '>':
    isTrue = v1 > v2;
    break;
  case '>=':
    isTrue = v1 >= v2;
    break;
  case '||':
    isTrue = v1 || v2;
    break;
  case '&&':
    isTrue = v1 && v2;
    break;
  }

  return isTrue ? opts.fn(this) : opts.inverse(this);
});
*/
handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    if ( this === undefined || this === null ) {
      throw new TypeError( '"this" is null or not defined' );
    }

    var length = this.length >>> 0; // Hack to convert object.length to a UInt32

    fromIndex = +fromIndex || 0;

    if (Math.abs(fromIndex) === Infinity) {
      fromIndex = 0;
    }

    if (fromIndex < 0) {
      fromIndex += length;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }

    for (;fromIndex < length; fromIndex++) {
      if (this[fromIndex] === searchElement) {
        return fromIndex;
      }
    }

    return -1;
  };
}

module.exports = {
  /**
   * Builds an HTML attribute table.
   * @param {String} name
   * @param {Object} data
   * @return {String}
   */
  _buildAttributeTable: function(name, data) {
    var div = L.DomUtil.create('div', 'result');

    if (!L.Util.isArray(data)) {
      data = [data];
    }

    for (var index in data) {
      var dataLayer = data[index],
        divTitle = L.DomUtil.create('div', 'title'),
        tableResults = L.DomUtil.create('table', null),
        tableResultsBody = L.DomUtil.create('tbody', null);

      divTitle.textContent = name;

      for (var fieldName in dataLayer) {
        var tableData = L.DomUtil.create('td', null),
          tableField = L.DomUtil.create('td', null),
          tableRow = L.DomUtil.create('tr', null);

        tableField.style.paddingRight = '10px';
        tableField.textContent = fieldName;
        tableRow.appendChild(tableField);
        tableData.textContent = dataLayer[fieldName];
        tableRow.appendChild(tableData);
        tableResultsBody.appendChild(tableRow);
      }

      tableResults.appendChild(tableResultsBody);
      div.appendChild(divTitle);
      div.appendChild(tableResults);
    }

    return div;
  },
  /**
   *
   */
  _checkDisplay: function(node, changed) {
    if (node.style && node.style.display === 'none') {
      changed.push(node);
      node.style.display = 'block';
    }
  },
  /**
   * Gets the autoPanPadding for the 'topright' corner of the map.
   * @param {Object} el
   * @return {Array}
   */
  _getAutoPanPaddingTopLeft: function(el) {
    var containers = this.getChildElementsByClassName(el, 'leaflet-top');

    return [this.getOuterDimensions(containers[0]).width + 20, this.getOuterDimensions(containers[1]).height + 20];
  },
  /**
   *
   */
  _lazyLoader: function(i,j){function k(a){var a=a.toLowerCase(),b=a.indexOf("js"),a=a.indexOf("css");return-1==b&&-1==a?!1:b>a?"js":"css"}function m(a){var b=document.createElement("link");b.href=a;b.rel="stylesheet";b.type="text/css";b.onload=c;b.onreadystatechange=function(){("loaded"==this.readyState||"complete"==this.readyState)&&c()};document.getElementsByTagName("head")[0].appendChild(b)}function f(a){try{document.styleSheets[a].cssRules?c():document.styleSheets[a].rules&&document.styleSheets[a].rules.length?c():setTimeout(function(){f(a)},250)}catch(b){setTimeout(function(){f(a)},250)}}function c(){g--;0==g&&j&&j()}for(var g=0,d,l=document.styleSheets.length-1,h=0;h<i.length;h++)if(g++,d=i[h],"css"==k(d)&&(m(d),l++,!window.opera&&-1==navigator.userAgent.indexOf("MSIE")&&f(l)),"js"==k(d)){var e=document.createElement("script");e.type="text/javascript";e.src=d;e.onload=c;document.getElementsByTagName("head")[0].appendChild(e)}},
  /**
   *
   */
  appendCssFile: function(urls, callback) {
    if (typeof urls === 'string') {
      urls = [
        urls
      ];
    }

    this._lazyLoader(urls, callback);
  },
  /**
   *
   */
  appendJsFile: function(urls, callback) {
    if (typeof urls === 'string') {
      urls = [
        urls
      ];
    }

    this._lazyLoader(urls, callback);
  },
  /**
   *
   */
  base64: (function(){return{encode:function(a){var b="",c,d,f,g,h,e,k=0;do c=a.charCodeAt(k++),d=a.charCodeAt(k++),f=a.charCodeAt(k++),g=c>>2,c=(c&3)<<4|d>>4,h=(d&15)<<2|f>>6,e=f&63,isNaN(d)?h=e=64:isNaN(f)&&(e=64),b=b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e);while(k<a.length);return b},decode:function(a){var b="",c,d,f,g,h,e=0;a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(e++)),d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(e++)),g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(e++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(e++)),c=c<<2|d>>4,d=(d&15)<<4|g>>2,f=(g&3)<<6|h,b+=String.fromCharCode(c),64!=g&&(b+=String.fromCharCode(d)),64!=h&&(b+=String.fromCharCode(f));while(e<a.length);return b}}})(),
  /**
   *
   */
  buildUrl: function(base, params) {
    var returnArray = [];

    if (params) {
      returnArray.push(base + '?');
    } else {
      return base;
    }

    for (var param in params) {
      returnArray.push(encodeURIComponent(param));
      returnArray.push('=');
      returnArray.push(encodeURIComponent(params[param]));
      returnArray.push('&');
    }

    returnArray.pop();
    return returnArray.join('');
  },
  /**
   * Converts data to HTML for the popup or tooltip control.
   * @param {Object} config
   * @param {Object} data
   * @param {String} type (Optional)
   * @return {String}
   */
  dataToHtml: function(config, data, type) {
    var html, options;

    type = type || 'popup';
    options = config[type];

    // TODO: Shouldn't NPMap.js move the layer popup config to layer._popup?
    if (options) {
      switch (typeof options) {
      case 'function':
        html = options(data);
        break;
      case 'object':
        var div = document.createElement('div');

        if (options.title) {
          var title = L.DomUtil.create('div', 'title', div);

          if (typeof options.title === 'function') {
            title.innerHTML = this.unescapeHtml(options.title(data));
          } else if (typeof options.title === 'string') {
            title.innerHTML = this.unescapeHtml(this.handlebars(options.title, data));
          }
        }

        // TODO: Should the popup config be named "content"?
        if (options.description) {
          var description = L.DomUtil.create('div', 'content', div);

          if (typeof options.description === 'function') {
            description.innerHTML = this.unescapeHtml(options.description(data));
          } else if (typeof options.description === 'string') {
            description.innerHTML = this.unescapeHtml(this.handlebars(options.description, data));
          }
        }

        if (options.media && data.image_url) {
          var imageType = {
            focus: function(guids) {
              var attrs, guidArray, i, imgs = [],
              regex = new RegExp('[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(}){0,1}', 'g'); //{ Fix Vim brackets
              guidArray = guids.match(regex);
              for (i = 0; i < guidArray.length; i++) {
                attrs = {
                  src: 'http://focus.nps.gov/GetAsset/' + guidArray[i] + '/proxy/lores',
                  href: 'http://focus.nps.gov/AssetDetail?assetID=' + guidArray[i]
                };
                imgs.push(attrs);
              }
              return imgs;
            }
          },
            imageDiv = L.DomUtil.create('div', '', div),
            mediaIndex;
            imageDiv.style.width = '250px';
            imageDiv.style.height = (250 * .75) + 'px';
            imageDiv.style.marginLeft = 'auto';
            imageDiv.style.marginRight = 'auto';


          for (mediaIndex = 0; mediaIndex < options.media.length; mediaIndex++) {
            var imageAttrs, newAnchor, newImage;
            if (imageType[options.media[mediaIndex].type]) {
              imageAttrs = imageType [options.media[mediaIndex].type](data.image_url);
              //TODO: Add multiple image support
              imageAttrs = imageAttrs;
              newAnchor = L.DomUtil.create('a', '', imageDiv);
              newAnchor.href = imageAttrs[0].href;
              newImage = L.DomUtil.create('img', '', newAnchor);
              newImage.src = imageAttrs[0].src;
              newImage.style.width = '100%';
            }
          }
        }

        if (options.actions && L.Util.isArray(options.actions)) {
          var actions = L.DomUtil.create('div', 'actions', div),
            ul = L.DomUtil.create('ul', null, actions),
            a, action, li;

          for (var i = 0; i < options.actions.length; i++) {
            action = options.actions[i];
            li = L.DomUtil.create('li', null, ul);
            a = L.DomUtil.create('a', null, li);
            a.innerHTML = action.title;
            L.DomEvent.addListener(a, 'click', action.handler);
          }
        }

        if (typeof options.width === 'number') {
          div.style.width = options.width + 'px';
        }

        html = div;
        break;
      case 'string':
        html = this.handlebars(options, data);
        break;
      }
    } else if (type === 'popup') {
      // TODO: Shouldn't NPMap.js move the layer name config to layer._name?
      var count = 0,
        name = config.name || 'Layer';

      for (var prop in data) {
        count++;
        break;
      }

      if (count) {
        html = this._buildAttributeTable(name, data);
      }
    }

    return html;
  },
  escapeHtml: function(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
  getChildElementsByClassName: function(parentNode, className) {
    var children = parentNode.childNodes,
      matches = [];

    function recurse(el) {
      var grandChildren = el.children;

      if (typeof el.className === 'string' && el.className.indexOf(className) !== -1) {
        var classNames = el.className.split(' ');

        for (var k = 0; k < classNames.length; k++) {
          if (classNames[k] === className) {
            matches.push(el);
            break;
          }
        }
      }

      if (grandChildren && grandChildren.length) {
        for (var j = 0; j < grandChildren.length; j++) {
          recurse(grandChildren[j]);
        }
      }
    }

    for (var i = 0; i < children.length; i++) {
      recurse(children[i]);
    }

    return matches;
  },
  /**
   *
   */
  getChildElementsByNodeName: function(parentNode, nodeName) {
    var children = parentNode.childNodes,
      matches = [];

    nodeName = nodeName.toLowerCase();

    function recurse(el) {
      var grandChildren = el.children;

      if (typeof el.nodeName === 'string' && el.nodeName.toLowerCase() === nodeName) {
        matches.push(el);
      }

      if (grandChildren && grandChildren.length) {
        for (var j = 0; j < grandChildren.length; j++) {
          recurse(grandChildren[j]);
        }
      }
    }

    for (var i = 0; i < children.length; i++) {
      recurse(children[i]);
    }

    return matches;
  },
  /**
   *
   */
  getElementsByClassName: function(className) {
    var matches = [],
      regex = new RegExp('(^|\\s)' + className + '(\\s|$)'),
      tmp = document.getElementsByTagName('*');
    
    for (var i = 0; i < tmp.length; i++) {
      if (regex.test(tmp[i].className)) {
        matches.push(tmp[i]);
      }
    }

    return matches;
  },
  /**
   *
   */
  getEventObject: function(e) {
    if (!e) {
      e = window.event;
    }

    return e;
  },
  /**
   *
   */
  getEventObjectTarget: function(e) {
    var target;

    if (e.target) {
      target = e.target;
    } else {
      target = e.srcElement;
    }

    if (target.nodeType === 3) {
      target = target.parentNode;
    }

    return target;
  },
  /**
   * Gets the next sibling of an HTML element.
   * @param {Object} el
   * @return {Object}
   */
  getNextSibling: function(el) {
    do {
      el = el.nextSibling;
    } while (el && el.nodeType != 1);

    return el;
  },
  /**
   * Gets the offset, in pixels, of an element.
   * @param {Object} el
   * @return {Object}
   */
  getOffset: function(el) {
    for (var lx = 0, ly = 0; el !== null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);

    return {left: lx, top: ly};
  },
  /**
   * Gets the outer dimensions, in pixels, of an HTML element.
   * @param {Object} el
   * @return {Object}
   */
  getOuterDimensions: function(el) {
    var height = 0,
      width = 0;

    if (el) {
      var changed = [],
        parentNode = el.parentNode;

      this._checkDisplay(el, changed);

      if (el.id !== 'npmap' && parentNode) {
        this._checkDisplay(parentNode, changed);

        while (parentNode.id && parentNode.id !== 'npmap' && parentNode.id !== 'npmap-map') {
          parentNode = parentNode.parentNode;

          if (parentNode) {
            this._checkDisplay(parentNode, changed);
          }
        }
      }

      height = el.offsetHeight;
      width = el.offsetWidth;

      changed.reverse();

      for (var i = 0; i < changed.length; i++) {
        changed[i].style.display = 'none';
      }
    }

    return {height: height, width: width};
  },
  /**
   * http://stackoverflow.com/a/2474742/27540
   */
  getOuterHtml: function(el) {
    if (!el || !el.tagName) {
      return '';
    }

    var div = document.createElement('div'),
      ax, txt;

    div.appendChild(el.cloneNode(false));
    txt = div.innerHTML;
    ax = txt.indexOf('>') + 1;
    txt = txt.substring(0, ax) + el.innerHTML + txt.substring(ax);
    div = null;
    return txt;
  },
  /**
   * UNDOCUMENTED
   */
  getPosition: function(el) {
    var obj = {left: 0, top: 0},
      offset = this.getOffset(el),
      offsetParent = this.getOffset(el.parentNode);

    obj.left = offset.left - offsetParent.left;
    obj.top = offset.top - offsetParent.top;

    return obj;
  },
  /**
   * Gets the previous sibling of an HTML element.
   * @param {Object} el
   * @return {Object}
   */
  getPreviousSibling: function(el) {
    do {
      el = el.previousSibling;
    } while (el && el.nodeType != 1);

    return el;
  },
  /**
   * http://stackoverflow.com/a/5675579/27540
   */
  getPropertyCount: function(obj) {
    if (!Object.keys) {
      var keys = [],
          k;

      for (k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          keys.push(k);
        }
      }

      return keys.length;
    } else {
      return Object.keys(obj).length;
    }
  },
  /**
   *
   */
  handlebars: function(template, data) {
    template = handlebars.compile(template);

    return template(data);
  },
  /**
   * Checks to see if a url is local or remote.
   * @param {String} url
   * @return {Boolean}
   */
  isLocalUrl: function(url) {
    return !(/^(?:[a-z]+:)?\/\//i.test(url));
  },
  /**
   *
   */
  loadFile: function(url, type, callback) {
    if (this.isLocalUrl(url)) {
      if (type === 'xml') {
        var request = new XMLHttpRequest();

        request.onload = function() {
          var text = this.responseText;

          if (text) {
            callback(text);
          } else {
            callback(false);
          }
        };
        request.open('get', url, true);
        request.send();
      } else {
        reqwest({
          error: function() {
            callback(false);
          },
          success: function(response) {
            if (response) {
              if (type === 'text') {
                callback(response.responseText);
              } else {
                callback(response);
              }
            } else {
              callback(false);
            }
          },
          type: type,
          url: url
        });
      }
    } else {
      reqwest({
        error: function() {
          callback(false);
        },
        success: function(response) {
          if (response) {
            callback(response);
          } else {
            callback(false);
          }
        },
        type: 'jsonp',
        url: 'http://npmap-proxy.herokuapp.com?callback=?&type=' + type + '&url=' + url
      });
    }
  },
  putCursorAtEndOfInput: function(input) {
    if (input.setSelectionRange) {
      var length = input.value.length * 2;
      input.setSelectionRange(length, length);
    } else {
      input.value = input.value;
    }
  },
  reqwest: reqwest,
  strict: function(_, type) {
    if (typeof _ !== type) {
      throw new Error('Invalid argument: ' + type + ' expected');
    }
  },
  strictInstance: function(_, klass, name) {
    if (!(_ instanceof klass)) {
      throw new Error('Invalid argument: ' + name + ' expected');
    }
  },
  strictOneOf: function(_, values) {
    if (values.indexOf(_) === -1) {
      throw new Error('Invalid argument: ' + _ + ' given, valid values are ' + values.join(', '));
    }
  },
  unescapeHtml: function(unsafe) {
    return unsafe
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '\"')
      .replace(/&#039;/g, '\'');
  }
};
