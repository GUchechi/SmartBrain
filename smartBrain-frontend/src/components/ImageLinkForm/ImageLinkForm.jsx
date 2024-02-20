import PropTypes from "prop-types";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ inputLink, onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try"}
      </p>

      <div className="center">
        {/* Input */}
        <div className="center form pa4 br3 shadow-1">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            value={inputLink}
            onChange={onInputChange}
          />
          <button
            type="submit"
            onClick={onButtonSubmit}
            className="w-30 f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

ImageLinkForm.propTypes = {
  inputLink: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm;
