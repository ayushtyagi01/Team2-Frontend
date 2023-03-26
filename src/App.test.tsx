import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom'; // add this import
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router> {/* wrap App component inside Router */}
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
