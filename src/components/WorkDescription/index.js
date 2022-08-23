import MarkdownPreview from '@uiw/react-markdown-preview';

const WorkDescription = ({ source }) => {
  //   const source = `# Function Sum
  //   ## Description
  //   Build a function that can used to find the sum of two number
  //   This function can be passed two parameters and return the sum of the number

  //   *Sample Input*
  //   'sum(2)'

  //   ### Hello World

  //   `;

  return <MarkdownPreview source={source} />;
};

export default WorkDescription;
