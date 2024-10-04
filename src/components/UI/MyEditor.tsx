import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

type props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const MyEditor = ({ 
  value,
  setValue
 }: props) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  

  return (
    <div className="my-10">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default MyEditor;