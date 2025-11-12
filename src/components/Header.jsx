import logo from "../assets/Black & Blue Minimalist Modern Initial Font Logo.png";

const Header = () => {
  return (
    <header className="w-full py-3 border-b border-accent bg-primary">
      <div className="max-w-5xl mx-auto pl-2 pr-4 md:pl-4 flex items-center justify-start gap-4 text-white">
        <img
          src={logo}
          alt="Site logo"
          className="h-14 md:h-16 w-auto select-none drop-shadow brightness-110 contrast-110"
          draggable={false}
        />
        <h1 className="text-2xl md:text-3xl font-heading">Princy Randhawa</h1>
      </div>
    </header>
  );
};

export default Header;
