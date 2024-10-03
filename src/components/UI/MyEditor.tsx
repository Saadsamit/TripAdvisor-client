import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

type props = {
  editorState: string;
  setEditorState: Dispatch<SetStateAction<string>>;
};

const MyEditor = ({ 
  editorState,
   setEditorState
 }: props) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  return (
    <div className="my-10">
      <ReactQuill theme="snow" value={editorState} onChange={setEditorState} />
    </div>
  );
};

export default MyEditor;