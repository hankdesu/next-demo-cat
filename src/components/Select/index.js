function Select({ options, handleChange }) {
  function _handleChange(e) {
    e.preventDefault();

    if (handleChange) handleChange(e);
  }
  return (
    <select className="border-solid border-gray-400 rounded-xl" onChange={_handleChange} defaultValue="">
      <option value="">Select a breed</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  )
}

export default Select;
