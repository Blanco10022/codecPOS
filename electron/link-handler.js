document.addEventListener('click', (event) => {
  // Check if the clicked element is an anchor tag or has an ancestor that is an anchor tag
  let target = event.target;
  while (target && target !== document.body) {
    if (target.tagName === 'A' && target.href) {
      event.preventDefault();
      
      const url = new URL(target.href);
      
      // Check if the link is internal (same origin)
      if (url.origin === window.location.origin) {
        const path = url.pathname;
        console.log('Navigating to:', path);
        window.posAPI.navigateTo(path);
      } else {
        // For external links, you might want to open them in the default browser
        console.log('External link:', url.href);
        // Uncomment the next line if you want to open external links in the default browser
        // window.posAPI.openExternal(url.href);
      }
      
      break;
    }
    target = target.parentElement;
  }
});
