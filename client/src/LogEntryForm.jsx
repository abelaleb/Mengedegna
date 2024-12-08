import { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";
const LogEntryForm = ({ latitude, longitude }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      data.latitude = latitude;
      data.longitude = longitude;
      const created = await createLogEntry(data);
      console.log(created);
      setLoading(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        {error ? (
          <h3 className="error" style={{ color: "red" }}>
            {error}
          </h3>
        ) : null}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="form-input"
          required
        />
        <br />
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          {...register("comments")}
          className="form-textarea"
        ></textarea>
        <br />
        <label htmlFor="image">Image</label>
        <input id="image" {...register("image")} className="form-input" />
        <br />
        <label htmlFor="visitDate" required>
          Visit Date
        </label>
        <input
          type="date"
          id="visitDate"
          {...register("visitDate")}
          className="form-input"
          required
        />
        <br />
        <button className="form-button" disabled={loading}>
          {loading ? "Loading..." : "Create Entry"}
        </button>
      </form>
    </div>
  );
};

export default LogEntryForm;
