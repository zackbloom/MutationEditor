(function() {
  var apply, changes, checkNode, observer, scan, textChanges;

  changes = {
    'h1': {
      content: "Other content"
    },
    'img[src="https://www.google.com/images/srpr/logo11w.png"]': {
      attrs: {
        src: 'http://email-assets.eager.io/logo-200x200.png'
      }
    }
  };

  textChanges = {
    'Four score and seven years': 'Forty seven years'
  };

  apply = function(element, orders) {
    var k, v, _ref, _results;
    if (orders.content) {
      element.innerHTML = orders.content;
    }
    if (orders.attrs) {
      _ref = orders.attrs;
      _results = [];
      for (k in _ref) {
        v = _ref[k];
        _results.push(element.setAttribute(k, v));
      }
      return _results;
    }
  };

  checkNode = function(addedNode) {
    var after, before, options, selector, _results, _results1;
    switch (addedNode.nodeType) {
      case 1:
        _results = [];
        for (selector in changes) {
          options = changes[selector];
          if (addedNode.matches(selector)) {
            _results.push(apply(addedNode, options));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
        break;
      case 3:
        _results1 = [];
        for (before in textChanges) {
          after = textChanges[before];
          _results1.push(addedNode.textContent = addedNode.textContent.replace(before, after));
        }
        return _results1;
    }
  };

  observer = new MutationObserver(function(mutations) {
    var addedNode, mutation, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = mutations.length; _i < _len; _i++) {
      mutation = mutations[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = mutation.addedNodes;
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          addedNode = _ref[_j];
          _results1.push(checkNode(addedNode));
        }
        return _results1;
      })());
    }
    return _results;
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  scan = function(el) {
    var child, _i, _len, _ref, _results;
    checkNode(el);
    if (!el.childList) {
      return;
    }
    _ref = el.childList;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(scan(child));
    }
    return _results;
  };

}).call(this);
