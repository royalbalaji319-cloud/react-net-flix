import { useTranslation } from "react-i18next";
// import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p id="para">{t("footer_ready_text")}</p>

      <div className="email-formm">
        <input type="email" placeholder={t("email_placeholder")} />
        <button>{t("get_started")} </button>
      </div>
      <br />
      <br />

      <p>
        {t("footer_questions")}{" "}
        <a href="">{t("footer_call_number")}</a>
      </p>

      <div className="footer-cols">
        <ul>
          <li>{t("footer_faq")}</li>
          <li>{t("footer_help_centre")}</li>
          <li>{t("footer_account")}</li>
          <li>{t("footer_media_centre")}</li>
          <li>{t("footer_legal_notices")}</li>
        </ul>

        <ul>
          <li>{t("footer_investor_relations")}</li>
          <li>{t("footer_jobs")}</li>
          <li>{t("footer_ways_to_watch")}</li>
          <li>{t("footer_terms")}</li>
          <li>{t("footer_speed_test")}</li>
        </ul>

        <ul>
          <li>{t("footer_privacy")}</li>
          <li>{t("footer_cookie")}</li>
          <li>{t("footer_corporate_info")}</li>
          <li>{t("footer_contact_us")}</li>
        </ul>
      </div>

      <p className="footer-bottom">{t("footer_country")}</p>
      <br />
      <br />
      <br />
      <p className="learn">
        {t("footer_recaptcha_text")}{" "}
        <a href="" id="parag">
          {t("footer_learn_more")}
        </a>
      </p>

      {/* ⚠️ Added Educational Disclaimer for Safety */}
      <p
        style={{
          textAlign: "center",
          color: "gray",
          fontSize: "14px",
          marginTop: "30px",
        }}
      >
         This is a learning/demo project — not the real Netflix site.
      </p>
    </footer>
  );
};

export default Footer;
