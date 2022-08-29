import React, { useContext } from 'react';
import { CodeContext } from '../../context/CodeContext';

export const Pane = () => {
  const { srcDoc } = useContext(CodeContext);
  return (
    <div className="flex-1 ">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
};
