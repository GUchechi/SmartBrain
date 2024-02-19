import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try"}
      </p>

      <div className="center">
        {/* Input */}
        <div className="center form pa4 br3 shadow-1">
          <input type="text" className="f4 pa2 w-70 center" />
          <button
            type="submit"
            className="w-30 f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
