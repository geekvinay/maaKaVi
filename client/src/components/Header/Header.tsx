import { Link } from "react-router-dom";

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user') || "{}" as string);

    return (
        <header className="absolute top-0 left-0 w-screen z-10 py-4 base-bg flex items-center justify-end px-[10rem] shadow-sm">
            <div className="flex items-center mr-auto">
                <span className="text-3xl font-bold text-gray-300">
                    <span className="text-orange-400">మా</span>Ka
                    <span className="text-green-400">Vi</span>
                </span>
            </div>
            <nav className="flex items-center space-x-4 px-[2rem]">
                <Link
                    to=""
                    className="text-base font-semibold capitalize text-gray-400 hover:text-gray-100 transition-colors duration-300"
                >
                    HOME
                </Link>
                <Link
                    to="/discussions"
                    className="text-base font-semibold capitalize text-gray-400 hover:text-gray-100 transition-colors duration-300"
                >
                    DISCUSSIONS
                </Link>
                <Link
                    to="/codeplay"
                    className="text-base font-semibold capitalize text-gray-400 hover:text-gray-100 transition-colors duration-300"
                >
                    CODEPLAY
                </Link>
                <Link
                    to="/kavi"
                    className="text-base font-semibold capitalize text-gray-400 hover:text-gray-100 transition-colors duration-300"
                >
                    KAVI
                </Link>
            </nav>
            <div className="user flex items-center">

                <p className="px-2 font-medium"><span className="text-gray-400">Welcome - </span> {user?.username}</p>
                <img
                    src={user?.thumbnail || "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
                    alt=""
                    className="rounded-full h-10 object-cover border-4 border-gray-500 border-transparent hover:border-gray-200 hover:border-current hover:cursor-pointer transition-all duration-500"
                />
            </div>
        </header>
    );
};

export default Header;
