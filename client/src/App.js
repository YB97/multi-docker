import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/otherpage">OtherPage</Link>
      <div className="App">
        <Route exact path="/" component={Fib} />
        <Route path="otherpage" component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
