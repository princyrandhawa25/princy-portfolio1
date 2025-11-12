const Footer = () => {
  return (
    <footer className="w-full py-6 mt-16 border-t border-accent bg-secondary-dark text-white">
      <div className="max-w-5xl mx-auto px-4 text-sm/relaxed">
        © {new Date().getFullYear()} Princy — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
