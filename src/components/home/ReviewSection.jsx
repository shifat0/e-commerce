import React, { useEffect, useState } from "react";
import { createReview, getReviews } from "../../api/apiReview";
import { userInfo } from "../../utils/auth";
import { showError, showSuccess } from "../../utils/messages";

export default function ReviewSection({ id, product }) {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getReviews(id).then((res) => setFeedbackList(res.data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createReview(userInfo().token, {
        product_id: product._id,
        review: feedback,
      });
      setSuccess(response.data.message);
      setFeedback("");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="mt-4">
      <h3>Feedback</h3>
      <hr />
      <div style={{ width: "100%" }}>
        {showError(error, error)}
        {showSuccess(success, success)}
      </div>
      {/* Feedback Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Place your feedback here for '{product?.name}'
          </label>
          <textarea
            id="feedback"
            className="form-control"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* List of Feedbacks */}
      <div className="card my-5">
        <h3 className="card-header">Feedbacks</h3>
        <ul className="list-group mt-4">
          {feedbackList ? (
            feedbackList.map((feedback) => (
              <li
                key={feedback._id}
                className="list-group-item d-flex flex-column"
              >
                <div className="d-flex">
                  <h6>{feedback.user.name}</h6>
                  <span
                    className="ml-5"
                    style={{ color: "gray", fontStyle: "italic" }}
                  >
                    {new Date(feedback.createdAt).toISOString().split("T")[0]}
                  </span>
                </div>
                <p className="mt-2">{feedback.review}</p>
              </li>
            ))
          ) : (
            <li className="list-group-item">No Feedbacks for this product</li>
          )}
        </ul>
      </div>
    </div>
  );
}
