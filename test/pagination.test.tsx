import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { PaginationSwipeable, PaginationAnimated } from '../src';

const sampleItems = [
  {
    id: 1,
    name: 'lorem'
  },
  {
    id: 2,
    name: 'ipsum'
  }
];

const SampleComponent: React.FC<{component? : any}> = ({ 
  component
}) => {
  return (
  <div>
      <h2>{component ? component.name : ''}</h2>
  </div>
  );
}

afterEach(cleanup)

describe('Basic rendering of PaginationSwipeable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <PaginationSwipeable  
        items={sampleItems}
        entryProp="component"
        children={<SampleComponent/>}
      />,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Basic rendering of PaginationAnimated', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <PaginationAnimated
        items={sampleItems}
        entryProp="component"
        children={<SampleComponent/>}
      />,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
