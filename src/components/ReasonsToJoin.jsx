import React from "react";
import "./ReasonsToJoin.css";
import { FaTv, FaDownload, FaRocket, FaSmile } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ReasonsToJoin = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      title: t("reason_tv_title"),
      desc: t("reason_tv_desc"),
      icon: <FaTv className="icon" />,
    },
    {
      id: 2,
      title: t("reason_download_title"),
      desc: t("reason_download_desc"),
      icon: <FaDownload className="icon" />,
    },
    {
      id: 3,
      title: t("reason_watch_title"),
      desc: t("reason_watch_desc"),
      icon: <FaRocket className="icon" />,
    },
    {
      id: 4,
      title: t("reason_kids_title"),
      desc: t("reason_kids_desc"),
      icon: <FaSmile className="icon" />,
    },
  ];

  return (
    <section className="reasons">
      <h2 className="reasons-title">{t("reasons_title")}</h2>
      <div className="cards">
        {cards.map((card) => (
          <div className="reason-card" key={card.id}>
            <div className="icon-wrapper">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsToJoin;
