origSrc = "http://www.ihd-wallpapers.com/wp-content/uploads/2014/08/Landscape-wallpapers-6.jpg"

params = "w=#{ (innerWidth / 2) | 0 }&format=auto"
optimizedSrc = "http://eager-proxy-test.imgix.net/#{ origSrc }?#{ encodeURIComponent params }"
optimizedSrc += "&s=37165b62d072c2323d50ae4360ac08ab"

changes =
  'img.fast': {attrs: {src: optimizedSrc}}

apply = (element, orders) ->
  if orders.content
    element.innerHTML = orders.content
  if orders.attrs
    for k, v of orders.attrs
      element.setAttribute k, v

checkNode = (addedNode) ->
  switch addedNode.nodeType
    when 1
      for selector, options of changes
        if addedNode.matches(selector)
          apply(addedNode, options)

observer = new MutationObserver (mutations) ->
  for mutation in mutations
    for addedNode in mutation.addedNodes
      checkNode(addedNode)

observer.observe document.documentElement,
  childList: true
  subtree: true
