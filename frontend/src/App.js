
import './App.css';
import Form from "./components/CreateTask/CreateTask.jsx"
import List from "./components/CreateTaskList/CreateTaskList.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Edit from './components/Edit_form/Edit.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/List' element={<List />} />
          <Route path='/List/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;