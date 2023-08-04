// Provider enables the state to be available all over the app through the store
import { Provider } from 'react-redux';
// ReactDOM insert the app into the DOM
import ReactDOM from 'react-dom/client';
// Allows routing for the app
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/index.scss';

import store from './store';

// Create a root element for the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
