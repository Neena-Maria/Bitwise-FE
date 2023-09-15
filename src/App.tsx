import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./store/store"; 
import Login from "./pages/login/Login";


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
