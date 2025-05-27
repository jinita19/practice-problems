import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Problems from './views/Problems';
import Accordion from './components/Accordian';
import Tabs from './components/Tabs';
import DataTable from './components/DataTable';
import ToDo from './components/ToDo';
import StarRating from './components/StarRating';
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problems/accordian" element={<Accordion />} />
        <Route path="/problems/tabs" element={<Tabs />} />
        <Route path="/problems/data-table" element={<DataTable />} />
        <Route path="/problems/todo" element={<ToDo />} />
        <Route path="/problems/star-rating" element={<StarRating />} />
        <Route path="/problems/progress-bar" element={<ProgressBar />} />
      </Routes>
    </Router>
  );
}

export default App;