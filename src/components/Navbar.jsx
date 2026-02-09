import { Link } from "react-router-dom";
import Language from "./Language.jsx";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="logo-image">
        <img 
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo" className='logoo'
          height="79px"
        />
      </div>

      <div className="nav-buttons">
        {/* Language dropdown */}
        <Language />

        {/* Sign in button with translation */}
        <button className="signin-btn">
          <Link to="/registerform" style={{ color: "white", textDecoration: "none" }}>
            {t("signin")}
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
