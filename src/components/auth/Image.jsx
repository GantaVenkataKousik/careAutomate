
const Image = ({ imageName }) => {
  const imagePath = `./images/${imageName}`;
  console.log(`./images/${imageName}`);
  const handleImageError = (e) => {
    console.error(`Error loading image: ${imagePath}`);
  };

  return (
    <div className="img-wrapper">
      <img src={imagePath} alt="" onError={handleImageError} />
    </div>
  );
};
export default Image;