const Header = () => {
    return (
        <section className="absolute top-0 left-0 w-screen z-10 py-4 base-bg flex items-center justify-between px-[6rem]">
            <span className="text-2xl font-bold text-gray-300 "><span className="text-orange-400">మా</span>Ka<span className="text-green-400">VI</span></span>
            <img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" alt="" className="rounded-full h-12 object-cover border-4 border-gray-500 border-transparent hover:border-gray-200 hover:border-current hover:cursor-pointer transition-all duration-500" />
        </section>
    );
};

export default Header;