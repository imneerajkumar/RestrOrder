import React, { useState, useEffect } from "react";
import Loader from "../UI/Loader";
import Item from "../Item/Item";
import { Button, Modal } from "react-bootstrap";
import CustomToast from "../UI/CustomToast";
import axios from "axios";

export default function EditMenu() {
  const url = process.env.REACT_APP_API_URL;
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState("");
  const [formValues, setFormValues] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getMenu = async () => {
    setFormValues({});
    await axios.get(`${url}/admin/getMenu`).then((res) => {
      setMenu(res.data);
    });
    setTimeout(() => setLoading(false), 1000);
  };

  const addItem = async (item) => {
    const res = await axios.post(`${url}/admin/addInMenu`, item);
    setShow(!show);
    setToast({
      open: true,
      message: `${res.data.message}`,
      variant: "success",
    });
    getMenu();
  };

  const editItem = async (id, item) => {
    const res = await axios.put(`${url}/admin/updateInMenu`, {
      id: id,
      item: item,
    });
    setShow(!show);
    setToast({
      open: true,
      message: `${item.name}: ${res.data.message}`,
      variant: "success",
    });
    getMenu();
  };

  const deleteItem = async (id, item) => {
    const res = await axios.delete(`${url}/admin/deleteInMenu/${id}`);
    setShow(!show);
    setToast({
      open: true,
      message: `${item.name}: ${res.data.message}`,
      variant: "success",
    });
    getMenu();
  };

  const handleShow = (id, item) => {
    if (id && item) {
      setAdd(false);
      setId(id);
      setFormValues({
        logo: item.logo,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        veg: item.veg,
      });
    } else {
      setAdd(true);
    }
    setShow(true);
  };

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div className="Menu">
          <Button onClick={handleShow}>Add Item</Button>
          {toast.open && (
            <CustomToast
              open={toast.open}
              variant={toast.variant}
              message={toast.message}
              onClose={() =>
                setToast({
                  open: false,
                  message: "",
                  variant: "",
                })
              }
            />
          )}
          {menu?.map((item, key) => (
            <Item
              item={item}
              key={key}
              index={key}
              editable={true}
              handleShow={handleShow}
            />
          ))}
          <Modal
            show={show}
            onHide={() => setShow(!show)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
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
              {!add && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => deleteItem(id, formValues)}
                >
                  Delete
                </button>
              )}
              {!add && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editItem(id, formValues)}
                >
                  Edit
                </button>
              )}
              {add && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => addItem(formValues)}
                >
                  Add
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
