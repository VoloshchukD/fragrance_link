import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import PerfumeTable from "./pages/PerfumeTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={"perfumes"} element={<PerfumeTable />} />
              <Route path={"*"} element={<Error />} />
            </Route>
            <Route path={"registration"} element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
