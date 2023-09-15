import { useState, useEffect } from "react";

import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import { convertToHTML } from "draft-convert";
import htmlToDraft from 'html-to-draftjs';
import _ from "lodash";

// const mentions =  [
//   { text: "JavaScript", value: "javascript", url: "js" },
//   { text: "Golang", value: "golang", url: "go" },
// ];

const Summer = ({message, linkedNodes, setMessage, setLinkedNodes, allDocs = [], updateData} : any) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    const [convertedContent, setConvertedContent] = useState(message?.message ?? "");
    const [mentionedItems, steMentionedItems] = useState(message?.linkedNodes);

    const replaceMentions = (value: string) => {
      let updatedString = value;
      const regex: any = /#(\w+)/g;
      const matches = updatedString.match(regex) || [];
      if(matches.length) {
        const mention = allDocs.find((m: any) => matches[0] === `#${m.value}`)
        const r = updatedString.replace(matches[0] as any, `<a href='${mention?.url}'><span style=\"background-color: #d4f4fa;\"><span style=\"color: #0055ff;\"><u>${mention?.text || matches[0]}</u></span></span></a>`)
        return r;
      }
      return updatedString;
    };

     useEffect(()=>{
     setEditorState(htmlToDraftBlocks(message ?? ""));

     },[message]);
    
    useEffect(() => {
      let html = convertToHTML(editorState.getCurrentContent());
      const updatedHtml = replaceMentions(html);
      setConvertedContent(updatedHtml);
        updateData({
          ...message,
          message: updatedHtml,
          linkedNodes: mentionedItems,
        });
    }, [editorState]);

    const onEditorStateChange = (value: any) => {
      setEditorState(value);
    }

    const htmlToDraftBlocks = (html: string) => {
      const blocksFromHtml = htmlToDraft(html ?? '');
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
          suggestions: allDocs,
        }}
      />
    </div>
  );
};

export default Summer;
