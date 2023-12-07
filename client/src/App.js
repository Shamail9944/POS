import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import SalesChart from './Pages/SalesChart';
import AdminPanel from './Pages/AdminPanel';
import Login from './Pages/Login';
import Register from './Pages/Register';


export const ProtectedRoute = ({ children }) => {

  if (localStorage.getItem("auth")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
};


// 3️⃣ Router singleton created
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path='/sales-dashboard' element={<ProtectedRoute><SalesChart /></ProtectedRoute>} />
    <Route path='/admin-dashboard' element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
  </Route>
));


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
