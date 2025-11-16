const Footer = () => {
  return (
    <footer className="w-full py-6 mt-16 border-t border-accent bg-primary text-white">
      <div className="max-w-5xl mx-auto px-4 text-sm/relaxed text-center">
        (c) {new Date().getFullYear()} Princy - All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
