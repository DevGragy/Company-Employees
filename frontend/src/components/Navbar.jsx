import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-red-500 flex flex-col justify-center sm:flex-row sm:justify-between px-20 py-5 text-center">
            <Link to="/" className="font-bold text-2xl text-white">
                <h1>Keyence</h1>
            </Link>

            <ul className="flex justify-center gap-x-1">
                <li className="text-white p-2"> 
                    <Link to="/">Home</Link>
                </li>
                <li className="text-white p-2">
                    <Link to="/create">Create</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
