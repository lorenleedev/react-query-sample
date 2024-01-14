import {CodeBlock, irBlack} from "react-code-blocks";

function MyCodeBlock({code}: {code: string}) {
  return (
    <CodeBlock
      text={code}
      language={"tsx"}
      theme={irBlack}
    />
  );
}

export default MyCodeBlock;