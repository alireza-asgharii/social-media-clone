import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <img src="/assets/icons/logo-mini-p.svg" alt="logo" className="w-10" />
        <h2 className="font-mono text-2xl font-bold">Minigram</h2>
      </div>
    </Link>
  );
};

export default Logo;
