function Select({ data, name, type, _ref }) {
  return (
    <>
      <p htmlFor={name + "-select"}>{name}</p>
      <select
        ref={_ref}
        id={name + "-select"}
        className={`form-control ${type ?? ""}`}
      >
        {data.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </>
  );
}

export default Select;
