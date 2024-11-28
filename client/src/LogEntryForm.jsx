import { useForm } from "react-hook-form";

const LogEntryForm = ({ latitude, longitude }) => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div>
        <b>Add your new log entry</b>
        <br />
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
        <br />
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register("title")} required />
          <br />
          <label htmlFor="comments">Comments</label>
          <textarea id="comments" {...register("comments")}></textarea>
          <br />
          <label htmlFor="image">Image</label>
          <input id="image" {...register("image")} />
          <br />
          <label htmlFor="visitDate" required>Visit Date</label>
          <input type="date" id="visitDate" {...register("visitDate")} required />
          <br />
          <button>Create Entry</button>
        </form>
      </div>
    </div>
  );
};

export default LogEntryForm;
