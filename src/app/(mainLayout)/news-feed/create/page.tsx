"use client"

import Container from "@/src/components/UI/Container";
import MyEditor from "@/src/components/UI/MyEditor";
import { useState } from "react";

const page = () => {
    const [editorState, setEditorState] = useState("");
    return (
        <Container>
            <MyEditor
            editorState={editorState} setEditorState={setEditorState}/>
            <div dangerouslySetInnerHTML={{__html: editorState }}></div>
        </Container>
    );
};

export default page;