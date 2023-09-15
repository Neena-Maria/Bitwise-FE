import TextEditor from "../../components/textEditor/TextEditor";
import SideBar from "../../components/sidebar/Sidebar";

const GoogleDocEditor = () => (
  <div className="flex h-screen w-screen">
    <SideBar />
    <div className="h-full w-full flex">
      <TextEditor />
    </div>
  </div>
);

export default GoogleDocEditor;
