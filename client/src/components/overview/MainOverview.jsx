import React, { useState, useEffect, useImperativeHandle } from "react";
import { useParams } from "react-router-dom";
import Description from "./description/Description.jsx";
import style from "./MainOverview.module.css";
import SideBar from "./sidebar/SideBar.jsx";
import Gallery from "./gallery/Gallery.jsx";
import SelectedStyle from "./sidebar/SelectedStyle.jsx";
import Features from "./description/Features.jsx";

const MainOverview = ({ prod, meta }) => {
  const [product, setProd] = useState([]);
  const { product_id } = useParams();
  const [images, setImages] = useState([]);
  const [currentThumb, setThumb] = useState("");
  const [displays, setdisplays] = useState("");
  const [thumbValue, setValue] = useState(false);
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [firstImg, setFirstImg] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  
  //////////////////////////////
  //refactor
  const [currentImageSet, setCurrentImageSet] = useState("");
  const [thumbModalValue, setThumbModalValue] = useState(false);
  const [arrowIndex, setArrowIndex] = useState(0);

  const handleSelectedStyle = (item) => {
    setThumbModalValue(false);
    product.map((current) => {
      if (current.style_id === item.style_id) {
        setCurrentImageSet(...current.photos);
      }
    });
    setArrowIndex(0);
  };
  const handleArrowValue = () => {
    setThumbModalValue(true);
    setValue(false);
  };

  const handleArrowRight = () => {
    handleArrowValue();

    setArrowIndex((current) => current + 1);
  };

  const handleArrowLeft = () => {
    handleArrowValue();
    setArrowIndex(arrowIndex - 1);
  };

  //////////////////////////////

  const handleSales = (item) => {
    setPrice(item.original_price);
    setSalePrice(item.sale_price);
  };

  const handleThumbChange = (e) => {
    if (e) {
      setValue(false);
    }
  };

  const handleThumb = (e, url) => {
    setThumb(url);
    setValue(true);
    setThumbModalValue(false);
  };

 

  const handleDisplays = (item) => {
    item.map((item) => setdisplays(item.url));
  };

 

  useEffect(() => {
    fetch(
      `/api/products/${product_id}/styles?format=json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProd((product) => data.results);
        setImages((images) =>
          data.results.map((item) => item.photos.map((img) => img))
        );
        setFirstImg(
          data.results.map((item) => item.photos.map((img) => img.url))
        );
        setThumbnailUrl(
          data.results.map((item) =>
            item.photos.map((img) => img.thumbnail_url)
          )
        );
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className={style.gridcontainer}>
      <div className={style.gallery}>
        <div>
          {prod && (
            <Gallery
              images={images}
              displays={displays}
              currentThumb={currentThumb}
              handleThumb={handleThumb}
              thumbValue={thumbValue}
              firstImg={firstImg}
              thumbnailUrl={thumbnailUrl}
              currentImageSet={currentImageSet}
              thumbModalValue={thumbModalValue}
              handleArrowValue={handleArrowValue}
              arrowIndex={arrowIndex}
              handleArrowRight={handleArrowRight}
              handleArrowLeft={handleArrowLeft}
            />
          )}
        </div>
      </div>
      <div className={style.sidebar}>
        <div>
          {prod && (
            <SideBar
              meta={meta}
              category={prod.category}
              name={prod.name}
              prices={product}
              price={price}
              salePrice={salePrice}
              prod={prod}
            />
          )}
        </div>
        <div>
          {prod && (
            <SelectedStyle
              handleThumbChange={handleThumbChange}
              product={product}
              handleDisplays={handleDisplays}
              handleSales={handleSales}
              handleSelectedStyle={handleSelectedStyle}
            />
          )}
        </div>
      </div>
      <div>
        <div className={style.line}></div>
        <div className={style.description}>
          <Description product={product} prod={prod} />
        </div>
      </div>
      <div className={style.description2}>
        <Features prod={prod} />
      </div>
    </div>
  );
};

export default MainOverview;
