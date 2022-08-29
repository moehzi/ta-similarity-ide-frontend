import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../../components/codeEditor';
import { Pane } from '../../components/pane';
import ResultMessage from '../../components/ResultMessage';
import { Loader } from '../../components/spinner';
import Terminal from '../../components/terminal';
import WebEditor from '../../components/webEditor';
import WorkDescription from '../../components/WorkDescription';
import { CodeContext } from '../../context/CodeContext';
import { DetailWorkContext } from '../../context/DetailWorkContext';

export const WorkArea = () => {
  const { result } = useContext(CodeContext);
  const { detailWork, loadingDetailWork } = useContext(DetailWorkContext);
  const { workId } = useParams();

  if (loadingDetailWork) {
    return <Loader />;
  }

  return (
    detailWork && (
      <div className="p-8">
        {/* <WorkDescription source={detailWork.description} /> */}
        <div className="flex">
          <WebEditor codeTest={detailWork.codeTest} workId={workId} />
          <Pane />
        </div>
        {result && (
          <div className="max-w-lg p-4 mt-4 bg-gray-100">
            <ResultMessage expectedOutput={detailWork.expectedOutput} />
            <Terminal expectedOutput={detailWork.expectedOutput} />
          </div>
        )}
      </div>
    )
  );
};
