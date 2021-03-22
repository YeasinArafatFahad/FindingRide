import { Link } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react'
import { UserContext } from '../../App'

const Header = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    return (
        <div className="container-fluid">
            <div className="header ">
                <nav className="nav">
                    <ul>
                        <li>
                            <img className="logo" alt="" />
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {loggedInUser.isSignedIn ? (
                            <li>
                                <Link onClick={() => setLoggedInUser({})}>Logout</Link>
                                <Link to="/" className="mx-4">{loggedInUser.name}</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}


                    </ul>
                </nav>


            </div>
        </div>
    );
};

export default Header;