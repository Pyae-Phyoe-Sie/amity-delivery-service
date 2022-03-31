import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="container">
            <h1><Link to="/">Amity Delivery Service</Link></h1>
            <div className="links">
                <Link to="/calculate-cost">Calculate Cost</Link>
                <Link to="/possible-route">Possible Route</Link>
            </div>
        </div>
    </nav>
  );
}
 
export default Navbar;