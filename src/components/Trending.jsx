import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../App.css";

const Trending = () => {
  const { t } = useTranslation();
  const rowRef = useRef(null);
  const [trending, setTrending] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  // Fetch trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=b2af243de2275e776422275824ff35bd`
        );
        const data = await response.json();
        setTrending(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrending();
  }, []);

  // Horizontal scroll
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Open trailer in modal
  const openTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b2af243de2275e776422275824ff35bd`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setVideoKey(trailer.key);
        setModalOpen(true);
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <div className="trending">
      <h2>{t("trending_now")}</h2>

      <div className="trending-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="trending-row" ref={rowRef}>
          {trending.map((item, index) => (
            <div
              key={item.id}
              className="trend-card"
              onClick={() => openTrailer(item.id)}
            >
              <span className="trend-num">{index + 1}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              className="close-btn"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trending;
