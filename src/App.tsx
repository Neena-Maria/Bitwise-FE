import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/login/Login";
import Board from "./pages/board/Board";
import WorkSpace from "./pages/workspace/Workspace";
import GoogleDocs from "./pages/googleDocs/GoogleDocs";
import MyDocs from "./pages/googleDocs/GoogleDocs";
import GoogleDocEditor from "./pages/GoogleDocEditor/GoogleDocEditor";
import MyDocEditor from "./pages/MyDocEditor/MyDocEditor";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/workspace/:id/google-docs" element={<GoogleDocs />} />
          <Route path="/workspace/:id/documents" element={<MyDocs />} />
          <Route
            path="/workspace/:id/google-docs/:googleDocId"
            element={<GoogleDocEditor />}
          />
          <Route
            path="/workspace/:id/documents/:myDocId"
            element={<MyDocEditor />}
          />
          <Route path="/workspace/:workspaceId/board" element={<Board />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
