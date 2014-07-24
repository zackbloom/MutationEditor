(function() {
  var apply, changes, observer, textChanges;

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

  observer = new MutationObserver(function(mutations) {
    var addedNode, after, before, mutation, options, selector, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = mutations.length; _i < _len; _i++) {
      mutation = mutations[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = mutation.addedNodes;
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          addedNode = _ref[_j];
          switch (addedNode.nodeType) {
            case 1:
              _results1.push((function() {
                var _results2;
                _results2 = [];
                for (selector in changes) {
                  options = changes[selector];
                  if (addedNode.matches(selector)) {
                    _results2.push(apply(addedNode, options));
                  } else {
                    _results2.push(void 0);
                  }
                }
                return _results2;
              })());
              break;
            case 3:
              _results1.push((function() {
                var _results2;
                _results2 = [];
                for (before in textChanges) {
                  after = textChanges[before];
                  _results2.push(addedNode.textContent = addedNode.textContent.replace(before, after));
                }
                return _results2;
              })());
              break;
            default:
              _results1.push(void 0);
          }
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

  setTimeout(function() {
    return document.documentElement.style.display = '';
  });

}).call(this);
