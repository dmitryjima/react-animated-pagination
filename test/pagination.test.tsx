import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PaginationSwipeable } from '../src';

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

describe('Basic rendering', () => {
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
