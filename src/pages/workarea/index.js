import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Pane } from '../../components/pane';
import ResultMessage from '../../components/ResultMessage';
import { Loader } from '../../components/spinner';
import Terminal from '../../components/terminal';
import WebEditor from '../../components/webEditor';
import WorkDescription from '../../components/WorkDescription';
import { CodeContext } from '../../context/CodeContext';
import { DetailWorkContext } from '../../context/DetailWorkContext';

export const WorkArea = () => {
  const { result, isCorrect } = useContext(CodeContext);
  const { detailWork, loadingDetailWork } = useContext(DetailWorkContext);
  const { workId } = useParams();

  if (loadingDetailWork) {
    return <Loader />;
  }

  return (
    detailWork && (
      <div className="p-4">
        <WorkDescription source={detailWork.description} />
        <WebEditor workId={workId} />

        <div className="p-4 mt-8 rounded bg-slate-300">
          {!!result?.expected_output?.[0] &&
            result.expected_output?.length > 0 && <Terminal />}
          {result && (
            <ResultMessage
              display={'Result Message'}
              value={isCorrect ? 'Correct Answer ✅' : 'Wrong answer :( ❌'}
            />
          )}
          {result.error_msg?.length > 0 && (
            <ResultMessage
              value={result.error_msg[0]}
              display={'Compiler Message'}
            />
          )}
        </div>

        <Pane />

        {/* </div> */}
      </div>
    )
  );
};
