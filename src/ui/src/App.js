import PerfumeTable from './components/PerfumeTable'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <PerfumeTable></PerfumeTable>
    </div>
    </QueryClientProvider>
  );
}

export default App;
