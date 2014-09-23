(function() {
  var apply, changes, checkNode, observer, optimizedSrc, origSrc, params, size;

  origSrc = "http://www.ihd-wallpapers.com/wp-content/uploads/2014/08/Landscape-wallpapers-6.jpg";

  size = (innerWidth / 2) | 0;

  params = "w=722&format=auto";

  optimizedSrc = "http://eager-proxy-test.imgix.net/" + origSrc + "?" + (encodeURIComponent(params));

  optimizedSrc += "&s=37165b62d072c2323d50ae4360ac08ab";

  changes = {
    'img.fast': {
      attrs: {
        src: optimizedSrc
      }
    }
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
    var options, selector, _results;
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

}).call(this);
