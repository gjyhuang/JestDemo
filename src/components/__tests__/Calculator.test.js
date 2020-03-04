import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from '../Calculator';
import { add, subtract } from '../calculations';

describe('The calculator component', () => {
  describe('Business logic', () => {
    it('the "add" function adds two numbers together', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 4)).toBe(3);
      expect(add("1", "4")).toBe(5);
    });
    it('the "subtract" function subtracts number b from number a', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(0, 2)).toBe(-2);
    })
  })
  describe('Visual component', () => {
    // it ('renders', () => {
    //   const {container} = render(<Calculator />);
    //   expect(container.firstChild).toBeTruthy();
    // })
    it('has a header with the text "Calculator"', () => {
      const container = render(<Calculator />);
      expect(container.getByText((content, element) => {
        // console.log(element);
        return element.tagName.toLowerCase() === 'div' && content === 'Calculator';
      })).toBeTruthy();
    });
    it('renders a calculate button represented by "="', () => {
      const container = render(<Calculator />);
      expect(container.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'input' && content === "=";
      })).toBeTruthy();
    });
    it('can add two numbers together by filling in the number forms and hitting the calculate button', () => {
      const container = render(<Calculator />);

      fireEvent.change(container.getByDisplayValue((value, element) => {
        // console.log(value);
        // console.log(element.type);
        // console.log(element.className);
          return element.id === 'num1';
        }), { target: { value: "1" }});
      fireEvent.change(container.getByDisplayValue((value, element) => {
          return element.id === 'num2';
        }), { target: { value: "2" }});
      // fireEvent.input(container.getByLabelText('numTwo'), 2);
      fireEvent.click(container.getByText('='));
      expect(container.getByText((content, element) => {
        // console.log(element.className);
        return element.className === 'result' && content === "3";
      })).toBeTruthy();
    });
  })
})

