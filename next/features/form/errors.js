import Error from "./error";

const Errors = ({ errors = [] }) => {
  return (
    <>
      {errors.map((error, i) => (
        <Error key={i}>{error}</Error>
      ))}
    </>
  );
};

export default Errors;
