import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div class="container">
            <h1>Amity Delivery Service</h1>
            <div className="links">
                <Link to="/calculate-cost">Calculate Cost</Link>
                <Link to="/possible-route">Possible Route</Link>
            </div>
        </div>
    </nav>
  );
}
 
export default Navbar;