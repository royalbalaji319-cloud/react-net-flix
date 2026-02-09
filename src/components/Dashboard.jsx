import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE } from "../config";
import "/src/cssfiles/Dashboard.css";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

// ------------------- Navbar -------------------
function Navbar({ activeMenu, onMenuSelect, onSearchResults }) {
  const [query, setQuery] = useState("");
  const menuItems = ["Home", "TV Shows", "Movies"];
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
        params: { api_key: TMDB_API_KEY, query },
      });
      onSearchResults(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    // Clear local/session storage if needed
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redirect to home or login page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item}>
                <button
                  className={`nav-link btn btn-link ${
                    activeMenu === item ? "active text-white" : "text-secondary"
                  }`}
                  onClick={() => onMenuSelect(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* 🔍 Search + Logout */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {/* ✅ Fixed Logout Button */}
            <button
              type="button"
              className="btn1 btn-danger ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

// ------------------- Dashboard -------------------
export default function Dashboard() {
  const allCategories = {
    Home: [
      { title: "Trending Now", url: `/trending/all/week` },
      { title: "Top Rated", url: `/movie/top_rated` },
      { title: "Action Movies", url: `/discover/movie?with_genres=28` },
      { title: "Comedy Movies", url: `/discover/movie?with_genres=35` },
      { title: "Horror Movies", url: `/discover/movie?with_genres=27` },
      { title: "Romance Movies", url: `/discover/movie?with_genres=10749` },
      { title: "Documentaries", url: `/discover/movie?with_genres=99` },
    ],
    "TV Shows": [
      { title: "Popular TV Shows", url: `/tv/popular` },
      { title: "Top Rated TV", url: `/tv/top_rated` },
    ],
    Movies: [
      { title: "Action Movies", url: `/discover/movie?with_genres=28` },
      { title: "Comedy Movies", url: `/discover/movie?with_genres=35` },
      { title: "Horror Movies", url: `/discover/movie?with_genres=27` },
      { title: "Romance Movies", url: `/discover/movie?with_genres=10749` },
      { title: "Documentaries", url: `/discover/movie?with_genres=99` },
    ],
  };

  const [movies, setMovies] = useState({});
  const [pages, setPages] = useState({});
  const [activeMenu, setActiveMenu] = useState("Home");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bannerMovie, setBannerMovie] = useState(null);
  const rowRefs = useRef({});

  // ✅ Fetch all categories
  useEffect(() => {
    const fetchCategory = async (cat, page = 1) => {
      try {
        const res = await axios.get(`${TMDB_BASE_URL}${cat.url}`, {
          params: { api_key: TMDB_API_KEY, page },
        });
        setMovies((prev) => ({
          ...prev,
          [cat.title]: prev[cat.title]
            ? [...prev[cat.title], ...res.data.results]
            : res.data.results,
        }));
        setPages((prev) => ({ ...prev, [cat.title]: page }));
      } catch (err) {
        console.error(err);
      }
    };

    Object.values(allCategories)
      .flat()
      .forEach((cat) => fetchCategory(cat));
  }, []);

  // ✅ Banner setup
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
          params: { api_key: TMDB_API_KEY },
        });
        const random =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];
        const type = random.media_type === "tv" ? "tv" : "movie";
        const trailerRes = await axios.get(
          `${TMDB_BASE_URL}/${type}/${random.id}/videos`,
          { params: { api_key: TMDB_API_KEY } }
        );
        const trailer = trailerRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setBannerMovie({ ...random, trailerKey: trailer?.key || null });
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanner();
  }, []);

  // ✅ Play trailer
  const playTrailer = async (item, type = "movie") => {
    try {
      const res = await axios.get(`${TMDB_BASE_URL}/${type}/${item.id}/videos`, {
        params: { api_key: TMDB_API_KEY },
      });
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setSelectedMovie({ ...item, trailerKey: trailer?.key || null });
    } catch (err) {
      console.error(err);
      setSelectedMovie(item);
    }
  };

  const displayedCategories = allCategories[activeMenu];

  // ✅ Infinite scroll for horizontal rows
  useEffect(() => {
    const handleScroll = async (title) => {
      const ref = rowRefs.current[title];
      if (!ref) return;

      if (ref.scrollWidth - ref.scrollLeft - ref.clientWidth < 200) {
        const catObj = Object.values(allCategories)
          .flat()
          .find((c) => c.title === title);
        const nextPage = (pages[title] || 1) + 1;

        try {
          const res = await axios.get(`${TMDB_BASE_URL}${catObj.url}`, {
            params: { api_key: TMDB_API_KEY, page: nextPage },
          });
          setMovies((prev) => ({
            ...prev,
            [title]: [...(prev[title] || []), ...res.data.results],
          }));
          setPages((prev) => ({ ...prev, [title]: nextPage }));
        } catch (err) {
          console.error(err);
        }
      }
    };

    Object.keys(rowRefs.current).forEach((title) => {
      const row = rowRefs.current[title];
      if (!row) return;

      const listener = () => handleScroll(title);
      row.addEventListener("scroll", listener);

      return () => row.removeEventListener("scroll", listener);
    });
  }, [movies, pages]);

  return (
    <div className="dashboard">
      <Navbar
        activeMenu={activeMenu}
        onMenuSelect={setActiveMenu}
        onSearchResults={() => {}}
      />

      {/* ✅ Banner */}
      {activeMenu === "Home" && bannerMovie && (
        <header className="hero-landing">
          {bannerMovie.trailerKey ? (
            <iframe
              className="hero-landing-video"
              src={`https://www.youtube.com/embed/${bannerMovie.trailerKey}?autoplay=1&mute=1&loop=1&playlist=${bannerMovie.trailerKey}`}
              title="Hero Trailer"
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div
              className="hero-landing-image"
              style={{
                backgroundImage: `url(${TMDB_IMAGE_BASE}${bannerMovie.backdrop_path})`,
              }}
            />
          )}
          <div className="hero-landing-overlay"></div>
          <div className="hero-landing-content">
            <h1>{bannerMovie.title || bannerMovie.name}</h1>
            <p className="hero-landing-description">
              {bannerMovie.overview?.length > 300
                ? bannerMovie.overview.slice(0, 300) + "..."
                : bannerMovie.overview}
            </p>
            <div className="hero-landing-buttons">
              <button
                className="hero-landing-play-btn"
                onClick={() => playTrailer(bannerMovie)}
              >
                <FaPlay /> Play
              </button>
              <button className="hero-landing-info-btn">
                <IoIosInformationCircleOutline /> More Info
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ✅ Trailer Modal */}
      {selectedMovie && (
        <div className="modal" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedMovie.trailerKey ? (
              <iframe
                width="100%"
                height="500px"
                src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}?autoplay=1`}
                title={selectedMovie.title || selectedMovie.name}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <img
                src={`${TMDB_IMAGE_BASE}${selectedMovie.poster_path}`}
                alt={selectedMovie.title || selectedMovie.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
            )}
            <h2>{selectedMovie.title || selectedMovie.name}</h2>
            <p>{selectedMovie.overview}</p>
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                background: "#e50914",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Movie Rows */}
      {displayedCategories.map((cat) => (
        <div key={cat.title} className="category">
          <h2>{cat.title}</h2>
          <div className="carousel-container">
            <div
              className="trending-row"
              ref={(el) => (rowRefs.current[cat.title] = el)}
            >
              {movies[cat.title]?.map((item) => (
                <div
                  key={item.id}
                  className="trending-card"
                  onClick={() =>
                    playTrailer(item, activeMenu === "TV Shows" ? "tv" : "movie")
                  }
                >
                  {item.poster_path ? (
                    <img
                      src={`${TMDB_IMAGE_BASE}${item.poster_path}`}
                      alt={item.title || item.name || "No Image"}
                    />
                  ) : (
                    <div className="no-poster">No Image</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
