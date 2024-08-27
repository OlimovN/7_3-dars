import React, { useState, useEffect } from 'react';
import './index.css';  

const DynamicForm = () => {
  const [rows, setRows] = useState([{ name: '', value: '', remarks: '' }]);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const handleAddRow = () => {
    setRows([...rows, { name: '', value: '', remarks: '' }]);
  };

  const handleRemoveRow = (index) => {
    if (index !== rows.length - 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  useEffect(() => {
    const lastRow = rows[rows.length - 1];
    const isAnyFieldEmpty = !lastRow.name || !lastRow.value || !lastRow.remarks;
    setIsAddButtonDisabled(isAnyFieldEmpty);
  }, [rows]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('formData', JSON.stringify(rows));
    alert('Form data saved to localStorage!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        {rows.map((row, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="name"
              value={row.name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Name"
              className="p-2 border rounded w-1/4 outline-slate-300"
            />
            <input
              type="text"
              name="value"
              value={row.value}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Value"
              className="p-2 border rounded w-1/4 outline-slate-300"
            />
            <input
              type="text"
              name="remarks"
              value={row.remarks}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Remarks"
              className="p-2 border rounded w-1/4 outline-slate-300"
            />
            {index !== rows.length - 1 && (
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
            {index === rows.length - 1 && (
              <button
                type="button"
                onClick={handleAddRow}
                className={`p-2 text-white rounded ${isAddButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
                disabled={isAddButtonDisabled}
              >
                Add More
              </button>
            )}
          </div>
        ))}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
