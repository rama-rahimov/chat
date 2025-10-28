import './main.css'
import LeftSidebar from './left-side.jsx';
import RightSidebar from './right-side.jsx';
import Header from './header.jsx';
function App() {
    return (
        <>
       <Header />
      <div className="main-card">
         <LeftSidebar />
         <RightSidebar />
      </div>
        </>
    )
}

export default App;