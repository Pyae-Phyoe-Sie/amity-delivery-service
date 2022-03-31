import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState('');

  return (
    <nav className="navbar">
        <div className="container">
            <h1><Link to="/">Amity Delivery Service</Link></h1>
            <div className="links">
                <Link className={(menu == "cost") ? "active" : ""} onClick={() => setMenu("cost")} to="/calculate-cost">Calculate Cost</Link>
                <Link className={(menu == "route") ? "active" : ""} onClick={() => setMenu("route")} to="/possible-route">Possible Route</Link>
            </div>
        </div>
    </nav>
  );
}
 
export default Navbar;