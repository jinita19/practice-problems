import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Problems from './views/Problems';
import Accordion from './components/Accordian';
import Tabs from './components/Tabs';
import DataTable from './components/DataTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problems/accordian" element={<Accordion />} />
        <Route path="/problems/tabs" element={<Tabs />} />
        <Route path="/problems/data-table" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;