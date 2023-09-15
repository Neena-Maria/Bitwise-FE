import { useState, useEffect } from "react";

import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import { convertToHTML } from "draft-convert";
import htmlToDraft from 'html-to-draftjs';

const mentions =  [
  { text: "JavaScript", value: "javascript", url: "js" },
  { text: "Golang", value: "golang", url: "go" },
];

const Summer = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    const [convertedContent, setConvertedContent] = useState('');
    const [mentionedItems, steMentionedItems] = useState([]);

    const replaceMentions = (value: string) => {
      let updatedString = value;
      const regex: any = /#(\w+)/g;
      const matches = updatedString.match(regex) || [];
      if(matches.length) {
        const mention = mentions.find(m => matches[0] === `#${m.value}`)
        const r = updatedString.replace(matches[0] as any, `<a href='${mention?.url}'><span style=\"background-color: #d4f4fa;\"><span style=\"color: #0055ff;\"><u>${mention?.text || matches[0]}</u></span></span></a>`)
        return r;
      }
      return updatedString;
    };

     useEffect(()=>{
     setEditorState(htmlToDraftBlocks("<p>Hello</p>"));
     },[]);
    
    useEffect(() => {
      let html = convertToHTML(editorState.getCurrentContent());
      const updatedHtml = replaceMentions(html);
      setConvertedContent(updatedHtml);
    }, [editorState]);

    const onEditorStateChange = (value: any) => {
      setEditorState(value);
    }

    const htmlToDraftBlocks = (html: string) => {
      const blocksFromHtml = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorStateContent = EditorState.createWithContent(contentState);
      const editorState = EditorState.moveFocusToEnd(editorStateContent);
      return editorState;
     }

  return (
    <div className="w-full h-screen">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        mention={{
          separator: " ",
          trigger: "#",
          suggestions: mentions,
        }}
      />
    </div>
  );
};

export default Summer;
