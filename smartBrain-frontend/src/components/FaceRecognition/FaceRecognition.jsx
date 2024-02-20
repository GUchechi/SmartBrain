import PropTypes from "prop-types";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} width="500px" height="auto" />
        <div
          className="bounding__box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

FaceRecognition.propTypes = {
  imageUrl: PropTypes.any.isRequired,
  box: PropTypes.any.isRequired,
};

export default FaceRecognition;
