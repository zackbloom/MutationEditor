changes =
  'h1': {content: "Other content"}
  'img[src="https://www.google.com/images/srpr/logo11w.png"]': {attrs: {src: 'http://email-assets.eager.io/logo-200x200.png'}}

textChanges =
  'Four score and seven years': 'Forty seven years'

apply = (element, orders) ->
  if orders.content
    element.innerHTML = orders.content
  if orders.attrs
    for k, v of orders.attrs
      element.setAttribute k, v

observer = new MutationObserver (mutations) ->
  for mutation in mutations
    for addedNode in mutation.addedNodes
      switch addedNode.nodeType
        when 1
          for selector, options of changes
            if addedNode.matches(selector)
              apply(addedNode, options)

        when 3
          for before, after of textChanges
            addedNode.textContent = addedNode.textContent.replace(before, after)

observer.observe document.documentElement,
  childList: true
  subtree: true

setTimeout ->
  document.documentElement.style.display = ''
