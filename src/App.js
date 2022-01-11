
import classes from './App.module.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppHeader from "./components/header/AppHeader";
import AppContent from "./components/content/AppContent";

function App() {
  return (
    <div className={classes.App}>
     <Router>
       <AppHeader/>
       <AppContent/>
     </Router>
    </div>
  );
}

export default App;
