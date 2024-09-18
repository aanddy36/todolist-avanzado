import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./sections/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./sections/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path=":userId" element={<ProtectedRoute />}/>
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
