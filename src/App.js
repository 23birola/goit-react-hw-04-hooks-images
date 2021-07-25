import { useState, useEffect } from "react";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import fetchImages from "./services/imageApi";
import Spinner from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [status, setStatus] = useState("IDLE");

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryInput = e.target.elements.query.value.toLowerCase();

    if (!queryInput.trim()) {
      setPage(1);
      setStatus("IDLE");
      return toast.error("Enter query", { position: "top-right" });
    }

    if (query === queryInput) {
      return;
    }

    setQuery(queryInput);
    setStatus("LOADING");
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query === "") return;
    async function getImages() {
      try {
        setStatus("LOADING");
        const receivedImages = await fetchImages(query, page);

        if (!receivedImages.length) {
          throw new Error();
        }

        setImages((s) => [...s, ...receivedImages]);
        setStatus("RESOLVED");

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      } catch {
        toast.error("wrong query", { position: "top-right" });
        setStatus("ERROR");
        return;
      }
    }
    getImages();
  }, [query, page]);

  const handleButtonClick = () => {
    setPage((s) => s + 1);
  };

  const onSelectImg = (src, alt) => {
    setSelectedImg({ src, alt });
  };

  const onModalClose = () => {
    setSelectedImg(null);
  };

  return (
    <div className="App">
      <Searchbar handleSubmit={handleSubmit} />
      {(status === "IDLE" || status === "ERROR") && (
        <Toaster position="top-right" />
      )}
      {(status === "LOADING" || status === "RESOLVED") && (
        <ImageGallery images={images} onSelectImg={onSelectImg} />
      )}
      {status === "LOADING" && <Spinner />}
      {status === "RESOLVED" && (
        <>
          <Button onClick={handleButtonClick} />
          {selectedImg && <Modal image={selectedImg} onClose={onModalClose} />}
        </>
      )}
    </div>
  );
}
