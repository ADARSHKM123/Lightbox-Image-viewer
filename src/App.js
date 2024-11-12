import React, { useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { images as IMAGES } from "./images";
// import './App.css';

function App() {
  const [images, setImages] = useState(IMAGES);
  const [mode, setMode] = useState('selection');
  const [index, setIndex] = useState(-1);


  const hasSelected = images.some((image) => image.isSelected);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'selection' ? 'lightbox' : 'selection');
  };

  // const handleSelectAllClick = () => {
  //   const updatedImages = images.map(image => ({ ...image, isSelected: mode === 'selection' ? true : false }));
  //   setImages(updatedImages);
  // };

  const handleClicklight = (index, item) => {
    if (!item.hasOwnProperty('isSelected')) {
      setIndex(index);
    }
  };
  const handleSelectAllClick = () => {
    const nextImages = images.map((image) => ({
      ...image,
      isSelected: !hasSelected,
    }));
    setImages(nextImages);
  };

  const handleClick = (index) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setImages(updatedImages);
  };

  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex((index + images.length - 1) % images.length);
  const handleMoveNext = () => setIndex((index + 1) % images.length);

  return (
    <div>
      <div>
      <button onClick={toggleMode}>
          {mode === 'selection' ? "Switch to Lightbox" : "Switch to Selection"}
        </button>
      </div>
      <div className="p-t-1 p-b-1">
        {/* <button onClick={toggleMode}>
          {mode === 'selection' ? "Switch to Lightbox" : "Switch to Selection"}
        </button> */}
        <button onClick={handleSelectAllClick}>
          {hasSelected ? "Clear selection" : "Select all"}
        </button>
      </div>
      <Gallery
        images={images}
        onClick={(index) => mode === 'selection' ? handleClick(index) : handleClicklight(index, images[index])}
        enableImageSelection={mode === 'selection' ? false : true}
      />

      {!!images[index] && (
        <Lightbox
          mainSrc={images[index].src}
          imageTitle={images[index].caption}
          mainSrcThumbnail={images[index].src}
          nextSrc={images[(index + 1) % images.length].src}
          nextSrcThumbnail={images[(index + 1) % images.length].src}
          prevSrc={images[(index + images.length - 1) % images.length].src}
          prevSrcThumbnail={images[(index + images.length - 1) % images.length].src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
}

export default App;
