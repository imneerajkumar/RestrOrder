import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./Item.css";

toast.configure();
function Item({ item, index, editable = false }) {
  const url = process.env.REACT_APP_API_URL;
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleShow = (item) => {
    setFormValues({
      logo: item.logo,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      veg: item.veg,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editItem = () => {
    axios.put(`${url}/admin/updatemenu`, {
      id: item._id,
      item: formValues,
    });
    setShow(!show);
  };

  const deleteItem = () => {
    axios.delete(`${url}/admin/deleteitem/${item._id}`);
    setShow(!show);
  };

  const addItem = (e) => {
    toast.success(`${item.name} added to cart`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    var name = e.target.name;
    var list = JSON.parse(localStorage.getItem("order"));

    list[Number(name)] += 1;
    localStorage.setItem("order", JSON.stringify(list));

    var total = Number(localStorage.getItem("total"));
    localStorage.setItem("total", total + Number(item.price));
  };

  return (
    <>
      <div className="Item">
        <div className="img-container">
          <img className="img" src={item.logo} alt={item.name} />
        </div>
        <div className="Details">
          <p className="Name">{item.name}</p>
          <p className="Description">{item.description}</p>
        </div>
        <div className="Order">
          <p className="Price">{"₹" + item.price}</p>
          {editable ? (
            <button
              name={index}
              className="Add"
              onClick={() => handleShow(item)}
            >
              -
            </button>
          ) : (
            <button className="Add" onClick={addItem}>
              +
            </button>
          )}
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Change Menu Item</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Logo:
              <input
                type="text"
                name="logo"
                value={formValues.logo}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Category:
              <select
                name="category"
                value={formValues.category}
                onChange={handleChange}
              >
                <option value="Breads">Breads</option>
                <option value="Bevrages">Bevrages</option>
                <option value="Desserts">Desserts</option>
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
              </select>
            </label>
            <label>
              Veg:
              <label>
                <input
                  type="radio"
                  name="veg"
                  value="true"
                  checked={formValues.veg === "true"}
                  onChange={handleChange}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="veg"
                  value="false"
                  checked={formValues.veg === "false"}
                  onChange={handleChange}
                />
                False
              </label>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={deleteItem}
          >
            Delete
          </button>
          <button type="button" className="btn btn-primary" onClick={editItem}>
            Edit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Item;
