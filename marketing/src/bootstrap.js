import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  console.log(initialPath);
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  onNavigate && history.listen(onNavigate);

  ReactDOM.render(
    <App history={history} />,
    el
  );

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devElement = document.querySelector('#dev-marketing');
  devElement && mount(devElement, { defaultHistory: createBrowserHistory() });
}

export { mount };