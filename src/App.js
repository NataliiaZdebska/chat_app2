import './App.scss';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow'
import { useStateValue } from './StateProvider';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  const [{ user }] = useStateValue();
  
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
      <div className='app__body'>
        <BrowserRouter>
          <Routes>
            <Route path='/chats/:chatId' element={<><Sidebar /><ChatWindow /></>} />
            <Route path='/' element={<Sidebar />} />
          </Routes>
        </BrowserRouter>
      </div>
      )}
      </div>
  );
}

export default App;
