import { useState, useEffect } from "react";

import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import { convertToHTML } from "draft-convert";
import htmlToDraft from 'html-to-draftjs';
import _ from "lodash";

const Summer = ({message, linkedNodes, setMessage, setLinkedNodes, allDocs = [], updateData} : any) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
    const [mentionedItems, setMentionedItems] = useState(message?.linkedNodes);

    const  replaceSubstrings = (inputString: string) => {
      const pattern = new RegExp(allDocs.map((d: any) => `#${d.value}`).join('|'), 'g');
    
      const resultString = inputString.replace(pattern, matched => {
        const doc = allDocs.find((doc: any) => (`#${doc.value}` === matched)); 
        return `<a href='${doc?.url}'><span style=\"background-color: #d4f4fa;\"><span style=\"color: #0055ff;\"><u>${doc?.text || pattern}</u></span></span></a>`
      });
    
      return resultString;
    }

     useEffect(()=>{
     setEditorState(htmlToDraftBlocks(message ?? ""));
     },[message]);
    

    const onEditorStateChange = (value: any) => {
      let html = convertToHTML(editorState.getCurrentContent());
      const mentionedDocs = allDocs.filter((i: any) => html.includes(i.value)).map((m: any) => ({
        id: m.id,
        name: m.name,
        type: m.type
      }))
      if(allDocs.map((d: any) => d.value).some((v: any) => html.includes(v))) {
        const updatedHtml = replaceSubstrings(html);
      setEditorState(htmlToDraftBlocks(updatedHtml));
      updateData({
        message: updatedHtml,
        linkedNodes: mentionedDocs,
      });
      return;
      }
      updateData({
        ...message,
        message: html,
        linkedNodes: mentionedItems,
      });
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
