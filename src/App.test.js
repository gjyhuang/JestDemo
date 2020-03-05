import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the calculator component via a div with the "calculator" id', () => {
  const { getByText } = render(<App />);
  // const calculatorComponent = getByText(/Calculator/i);
  // expect(calculatorComponent).toBeInTheDocument();
  expect(getByText((content, element) => {
    return element.id.toLowerCase() === 'calculator'
  })).toBeTruthy();
});
