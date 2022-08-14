// import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Container from "./Container/Container";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container></Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
