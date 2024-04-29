import React from 'react';

const LazyComponent: React.FC = () => {
  return (
    <div className='text-white text-center'>
      <h2>Lazy Loaded Component</h2>
      <p>This component was lazy-loaded!</p>
    </div>
  );
};

export default LazyComponent;
