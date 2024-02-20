import PropTypes from "prop-types";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img src={imageUrl} width="500px" height="auto" />
      </div>
    </div>
  );
};

FaceRecognition.propTypes = {
  imageUrl: PropTypes.any.isRequired,
};

export default FaceRecognition;
