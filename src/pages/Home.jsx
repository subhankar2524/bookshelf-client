import { useNavigate } from "react-router-dom";
import SearchBooks from "../components/searchBooks";
import '../styles/pages/home.css'

const Home = () => {
  // const navigate = useNavigate();

  return (
    <div className="home-container">
      <div style={{height: '30%'}}></div>
      <SearchBooks />
    </div>
  );
};

export default Home;