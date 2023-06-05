import React, { useEffect, useState } from "react";

const ImageGalleryEdit = ({ data }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setFirstImage();
  }, [data]);

  const setFirstImage = () => {
    if (data.length > 0) {
      const firstImage = data[0];
      setImageSrc(firstImage);
    }
  };

  // Hàm dùng để khi click vào ảnh nhỏ thì ảnh to sẽ thay đổi -ThienBD
  const handleThumbnailClick = (index) => {
    const selectedImage = data[index];
    setImageSrc(selectedImage);
  };

  // Hàm này cũng đúng như tên, dùng để render ra ảnh - ThienBD
  const renderImages = () => {
    return data.map((image, index) => (
      <div className="image" key={index}>
        <img
          className="thumbnail"
          style={{ height: "50px", width: "50px", cursor: "pointer" }}
          src={image}
          alt="Thumbnail"
          onClick={() => handleThumbnailClick(index)}
        />
      </div>
    ));
  };

  return (
    <div>
      <div className="box snake thien_snake" style={{ marginBottom: "20px" }}>
        <div
          className="gallery-img "
          style={{ display: "flex", alignItems: "center" }}
        >
          <img className="thien_avatar" src={imageSrc} alt="avatar" />
        </div>
        <div className="overlay"></div>
      </div>
      <output>{renderImages()}</output>
    </div>
  );
};

export default ImageGalleryEdit;