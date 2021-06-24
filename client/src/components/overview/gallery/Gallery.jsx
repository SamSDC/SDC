import React, { useEffect, useState, useCallback } from "react";
import style from "../MainOverview.module.css";
import Thumbnails from "./Thumbnails.jsx";
import ModalThumbs from "./ModalThumbs.jsx";
const Modal = React.lazy(() => import("../../reviews/Modal.jsx"));

const Gallery = ({
  images,
  handleThumb,
  currentThumb,
  thumbValue,
  firstImg,
  currentImageSet,
  thumbModalValue,
  arrowIndex,
  handleArrowRight,
  handleArrowLeft,
}) => {
  const [zoom, setZoom] = useState(0);
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [arrowModal, setArrowModal] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState("");
  const [thumbLimit, setThumbLimit] = useState(7);
  const [arrayOfThumbs, setArrayOfThumbs] = useState("");
  const [leftOverThumbs, setLeftOverThumbs] = useState("");
  const [pagination, setPagination] = useState(false);

  useEffect(() => {
    if (arrayOfThumbs.length <= 0) {
      if (images.length - thumbLimit > 0) {
        setLeftOverThumbs(images.slice(thumbLimit, images.length));
      }
      setArrayOfThumbs(images.slice(0, thumbLimit));
    }
  });

  const handleThumbnailIndex = (e, item) => {
    setSelectedThumb(item[0].thumbnail_url);
  };

  const handlePagination = () => {
    setPagination((current) => !current);
  };

  return (
    <div className={style.mainGallery}>
      {arrowIndex !== 0 && (
        <div
          className={style.arrows}
          id={style.right}
          onClick={() => {
            setArrowModal(true);
            handleArrowLeft();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
        </div>
      )}
      <div className={style.thumbs}>
        {images &&
          arrayOfThumbs &&
          !pagination &&
          arrayOfThumbs.map((item, i) =>
            item.map((img) => (
              <div
              key={i}
                onClick={(e) => {
                  handleThumbnailIndex(e, item);
                }}
                style={{
                  border:
                    img.thumbnail_url === selectedThumb && thumbValue
                      ? "3px #D96C06 solid"
                      : null,
                  maxHeight: "75px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              >
                <Thumbnails
                  images={images}
                  handleThumb={handleThumb}
                  thumbUrl={img.thumbnail_url}
                  key={item}
                />
              </div>
            ))
          )}
        <div className={style.extraThumbs} style={{ width: "60px" }}>
          {images &&
            leftOverThumbs &&
            pagination &&
            leftOverThumbs.map((item) =>
              item.map((img) => (
                <div
                  onClick={(e) => {
                    handleThumbnailIndex(e, item);
                  }}
                  style={{
                    border:
                      img.thumbnail_url === selectedThumb && thumbValue
                        ? "3px #D96C06 solid"
                        : null,
                    maxHeight: "80px",
                    borderRadius: "8px",
                    marginRight: "10px",
                  }}
                >
                  <Thumbnails
                    images={images}
                    handleThumb={handleThumb}
                    thumbUrl={img.thumbnail_url}
                    key={item}
                  />
                </div>
              ))
            )}
        </div>
        {!pagination ? (
          <div
            style={{ marginLeft: "25%", padding: "5%", cursor: "pointer" }}
            onClick={leftOverThumbs ? handlePagination : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
            </svg>
          </div>
        ) : (
          <div
            style={{ marginLeft: "25%", padding: "5%", cursor: "pointer" }}
            onClick={() => setPagination((current) => !current)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
            </svg>
          </div>
        )}
      </div>
      {images.length > 0 && (
        <div>
          {currentThumb && thumbValue === true ? (
            <div
              style={{
                background: thumbModalValue
                  ? `url('${images[arrowIndex][0].thumbnail_url}') no-repeat center center / cover`
                  : `url('${currentThumb}') no-repeat center center / cover`,
              }}
              onClick={() => setExpandedOpen(true)}
              className={style.image}
            ></div>
          ) : !currentImageSet.url ? (
            <div
              style={{
                background:
                  firstImg && !thumbModalValue
                    ? `url('${firstImg[0].join()}') no-repeat center center / cover `
                    : `url('${images[arrowIndex][0].thumbnail_url}') no-repeat center center / cover`,
                maxWidth: "100%",
                minWidth: "100%",
              }}
              onClick={() => setExpandedOpen(true)}
              className={style.image}
            ></div>
          ) : (
            <div
              style={{
                background: thumbModalValue
                  ? `url('${images[arrowIndex][0].thumbnail_url}') no-repeat center center / cover`
                  : `url('${currentImageSet.url}') no-repeat center center / cover`,
              }}
              onClick={() => setExpandedOpen(true)}
              className={style.image}
            ></div>
          )}
        </div>
      )}
      {images && arrowIndex !== images.length - 1 && (
        <div
          className={style.arrows}
          id={style.right}
          onClick={() => {
            handleArrowRight();
            setArrowModal(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
        </div>
      )}
        <Modal>
          {expandedOpen && (
            <div
              className={style.modal}
              style={{
                position: "fixed",
                height: "80%",
                width: "100%",
                backgroundColor: "#F5EFED",
                padding: 50,
                top: "10px",
              }}
            >
              {arrowIndex !== 0 && (
                <div
                  style={{ marginBottom: "300px", marginRight: "20px" }}
                  className={style.arrows}
                  id={style.right}
                  onClick={() => {
                    handleArrowLeft();
                    setArrowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                  </svg>
                </div>
              )}
              <div id={style.thumbModals}>
                {images &&
                  images.map((item) =>
                    item.map((img) => (
                      <ModalThumbs
                        handleThumb={handleThumb}
                        thumbUrl={img.thumbnail_url}
                        key={item}
                      />
                    ))
                  )}
              </div>
              <div
                onClick={() => setZoom(zoom + 1)}
                className={zoom % 2 === 1 ? style.expanded : null}
                style={{
                  height: "100%",
                  width: "50%",
                  background:
                    !currentImageSet.url &&
                    !currentThumb &&
                    firstImg &&
                    !arrowModal &&
                    images
                      ? `url('${firstImg[0].join()}') no-repeat `
                      : currentThumb && thumbValue === true
                      ? `url('${currentThumb}') no-repeat center center / cover`
                      : thumbModalValue
                      ? `url(${images[arrowIndex][0].thumbnail_url}) no-repeat center center / cover`
                      : `url('${currentImageSet.url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  transition: "transform .8s ease",
                  cursor: zoom % 2 === 1 ? "zoom-out" : "crosshair",
                }}
              ></div>
              <div
                onClick={() => {
                  setExpandedOpen(false);
                }}
                style={{
                  marginBottom: "37%",
                  cursor: "pointer",
                  float: "right",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm8.8-5v14h-20v-3h-4v-15h21v4h3zm-20 9v-9h15v-2h-17v11h2zm18-7h-16v10h16v-10z" />
                </svg>
              </div>
              {images && arrowIndex !== images.length - 1 && (
                <div
                  style={{ marginBottom: "300px" }}
                  className={style.arrows}
                  id={style.right}
                  onClick={() => {
                    handleArrowRight();
                    setArrowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </Modal>
    </div>
  );
};
export default Gallery;
