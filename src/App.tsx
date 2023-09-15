import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/login/Login";
import Board from "./pages/board/Board";
<<<<<<< HEAD
=======
import WorkSpace from './pages/workspace/Workspace';
>>>>>>> c8a422e29f12a8bf5e32271c48a666cc27566fda

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
<<<<<<< HEAD
=======
          <Route path="/workspace" element={<WorkSpace />} />
>>>>>>> c8a422e29f12a8bf5e32271c48a666cc27566fda
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
