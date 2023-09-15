import { useState, useEffect } from "react";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import { convertToHTML } from "draft-convert";

const Summer = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    const [convertedContent, setConvertedContent] = useState('');
    useEffect(() => {
      let html = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(html);
    }, [editorState]);

    console.log("editor", convertedContent);

  return (
    <>
      <p>InTextEditor</p>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        mention={{
          separator: " ",
          trigger: "#",
          suggestions: [
            { text: "JavaScript", value: "javascript", url: "js" },
            { text: "Golang", value: "golang", url: "go" },
          ],
        }}
      />
    </>
  );
};

export default Summer;
