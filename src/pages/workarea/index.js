import React, { useContext } from 'react';
import CodeEditor from '../../components/codeEditor';
import ResultMessage from '../../components/ResultMessage';
import Terminal from '../../components/terminal';
import WorkDescription from '../../components/WorkDescription';
import { CodeContext } from '../../context/CodeContext';

export const WorkArea = () => {
  const { result } = useContext(CodeContext);
  return (
    <div className="flex justify-center gap-4 p-8">
      <WorkDescription />
      <div className="w-full">
        <CodeEditor />
        {result && (
          <div className="p-4 mt-4 bg-gray-100">
            <ResultMessage />
            <Terminal />
          </div>
        )}
      </div>
    </div>
  );
};
