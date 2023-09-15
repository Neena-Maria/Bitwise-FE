import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/login/Login";
import Board from "./pages/board/Board";
import WorkSpace from "./pages/workspace/Workspace";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/workspace/:workspaceId" element={<WorkSpace />} />
          <Route path="/workspace/:workspaceId/board" element={<Board />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
