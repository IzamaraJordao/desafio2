import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Card } from './components/Card';
import { Editar } from './components/Editar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes >
        <Route path="/"  index={false} element={<Card />} />
        <Route path="/edit/:id" element={<Editar />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
