import React from "react";

function CardForm({
  cardData,
  handleChange,
  handleSubmit,
  handleOther,
  submitButtonText,
  otherButtonText,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={cardData.front}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={cardData.back}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-primary ml-3"
        onClick={handleOther}
      >
        {otherButtonText}
      </button>
      <button type="submit" className="btn btn-secondary ml-2">
        {submitButtonText}
      </button>
    </form>
  );
}

export default CardForm;
