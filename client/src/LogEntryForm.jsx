import { useForm } from "react-hook-form";

const LogEntryForm = ({ latitude, longitude }) => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="form-button">Create Entry</button>
        </form>
      </div>
  );
};

export default LogEntryForm;
