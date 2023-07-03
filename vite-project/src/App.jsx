import  { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState([{ minAmount: '', maxAmount: '', discount: '', type: '1' }]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const jsonData = JSON.stringify(formData, null, 2);
      console.log(jsonData);
    }
  };

  const handleAddSteps = () => {
    setFormData([...formData, { minAmount: '', maxAmount: '', discount: '', type: '1' }]);
  };

  const handleDeleteStep = (index) => {
    if (formData.length > 1) {
      const updatedData = [...formData];
      updatedData.splice(index, 1);
      setFormData(updatedData);
    }
  };

  const handleInputChange = (e, index, key) => {
    const updatedData = [...formData];
    updatedData[index][key] = e.target.value;
    setFormData(updatedData);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = [];

    formData.forEach((data, index) => {
      const { minAmount, maxAmount } = data;
      let isValid = true;

      if (!/^\d+$/.test(minAmount)) {
        newErrors[index] = 'Please enter a valid minimum amount (only digits are allowed)';
        isValid = false;
      } else if (parseInt(minAmount, 10) < 10) {
        newErrors[index] = 'Please enter a minimum amount greater than or equal to 10';
        isValid = false;
      } else if (parseInt(minAmount, 10) > 999) {
        newErrors[index] = 'Please enter a minimum amount less than or equal to 999';
        isValid = false;
      }

      if (!/^\d+$/.test(maxAmount)) {
        newErrors[index] = 'Please enter a valid maximum amount (only digits are allowed)';
        isValid = false;
      } else if (parseInt(maxAmount, 10) > 999) {
        newErrors[index] = 'Please enter a maximum amount less than or equal to 999';
        isValid = false;
      } else if (parseInt(maxAmount, 10) < 10) {
        newErrors[index] = 'Please enter a maximum amount greater than or equal to 10';
        isValid = false;
      }

      if (isValid) {
        newErrors[index] = '';
      }
    });

    setErrors(newErrors);

    valid = newErrors.filter((error) => error !== '').length === 0;

    return valid;
  };

  return (
    <div className='container mx-auto'>
      <h2 className='mt-2 text-success'>Recharge Range Between 10 To 999</h2>
      {formData.map((data, index) => (
        <div key={index} className="container mx-auto mt-5">
          <form>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Min Amount</label>
                  <input
                    type="text"
                    value={data.minAmount}
                    onChange={(e) => handleInputChange(e, index, 'minAmount')}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  {errors[index] && <p className="text-danger">{errors[index]}</p>}
                </div>
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={data.type}
                  onChange={(e) => handleInputChange(e, index, 'type')}
                  aria-label="Default select example"
                >
                  <option value="1">Amount</option>
                  <option value="2">Percentage</option>
                </select>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Max Amount</label>
                  <input
                    type="text"
                    value={data.maxAmount}
                    onChange={(e) => handleInputChange(e, index, 'maxAmount')}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  {errors[index] && <p className="text-danger">{errors[index]}</p>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Discount Amount</label>
                  <input
                    type="text"
                    value={data.discount}
                    onChange={(e) => handleInputChange(e, index, 'discount')}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
      {formData.length > 1 && (
        <div className="container mx-auto d-flex justify-content-end">
          <button type="button" onClick={() => handleDeleteStep(formData.length - 1)} className="btn btn-danger mt-3">
          <i className="fa-solid fa-trash-can"></i>  Delete
          </button>
        </div>
      )}
      <div className="container mx-auto">
        <button className="btn btn-info mt-5" onClick={handleAddSteps}>
        <i className="fa-solid fa-plus"></i> Add Steps
        </button>
      </div>
      <div className="container mx-auto d-flex justify-content-end">
        <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
