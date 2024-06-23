import './App.css';
import Router from './Router/Router';
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
