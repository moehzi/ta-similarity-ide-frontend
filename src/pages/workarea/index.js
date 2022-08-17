import React from 'react';
import CodeEditor from '../../components/codeEditor';
import Terminal from '../../components/terminal';

export const WorkArea = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <CodeEditor />
      <Terminal />
    </div>
  );
};
