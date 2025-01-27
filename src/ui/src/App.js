import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Error from "./components/Error";
import PerfumeTable from "./components/PerfumeTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout />}>
              <Route index element={<Home/>} />
              <Route path={"perfumes"} element={<PerfumeTable />} />
              <Route path={"*"} element={<Error/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
