import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import Calculator from '../Calculator';
import { add } from '../calculations';

describe('The calculator component', () => {
  describe('Business logic', () => {
    it('the "add" function adds two numbers together', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 3)).toBe(2);
      expect(add(0, 0)).toBe(0);
    })
  });
  describe('Visual component', () => {
    it('renders', () => {
      const { container, debug } = render(<Calculator />);
      // examples of viewable debug info:
      // console.log(debug());
      // console.log('firstchild', prettyDOM(container.firstChild))
      // console.log(container.parentElement)
      expect(container.firstChild).toBeTruthy();
    });
    it('has a header with the text "Calculator"', () => {
      const { getByText } = render(<Calculator />);
      expect(getByText((content, element) => {
        return element.tagName.toLowerCase() === 'div' && content === 'Calculator';
      })).toBeTruthy();
    });
    it('has two forms to input the numbers to be used in the calculator', () => {
      const { getAllByRole } = render(<Calculator />);
      const forms = getAllByRole('textbox').filter(form => form.type === 'number');
      expect(forms).toHaveLength(2);
    });
    it('which have the ids of "numOne" and "numTwo" and are set to 0 as default values', () => {
      const { getByDisplayValue } = render(<Calculator />);
      expect(getByDisplayValue((value, element) => {
        // examples of viewable debug info:
        // console.log(element.id)
        // console.log(value, typeof value)
        return element.id === "numOne" && value === "0";
      })).toBeTruthy();
      expect(getByDisplayValue((value, element) => {
        return element.id === "numTwo" && value === "0";
      })).toBeTruthy();
    });
    it('renders a calculate button represented by "="', () => {
      const { getByText } = render(<Calculator />);
      expect(getByText((content, element) => {
        return element.id === 'calcBtn' && content === '=';
      })).toBeTruthy();
    });
    it('can add two numbers together by filling in the number forms and hitting the calculate button', () => {
      const { getByDisplayValue, getByText, getAllByRole, debug } = render(<Calculator />);
      // using getAllByRole and looping through the forms:
      const expectations = {
        numOne: 1,
        numTwo: 2,
      }
      const forms = getAllByRole('textbox').filter(form => form.type === 'number');
      forms.forEach((form) => {
        fireEvent.change(form, {target: { value: expectations[form.id] }} )
      })

      // selecting each individual form:
      // fireEvent.change(getByDisplayValue((value, element) => {
      //   return element.id === "numOne";
      // }), { target: { value: 1 }});
      // fireEvent.change(getByDisplayValue((value, element) => {
      //   return element.id === "numTwo";
      // }), { target: { value: 2 }});
      fireEvent.click(getByDisplayValue('='));
      expect(getByText((content, element) => {
        return element.className === 'result' && content === "3";
      })).toBeTruthy();
    })
  });
});
