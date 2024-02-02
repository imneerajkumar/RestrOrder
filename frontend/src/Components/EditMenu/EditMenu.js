import React, { useState, useEffect } from "react";
import Loader from "../UI/Loader";
import Item from "../Item/Item";
import { Modal } from "react-bootstrap";
import CustomToast from "../UI/CustomToast";
import axios from "axios";
import "./EditMenu.css";

export default function EditMenu() {
  const url = process.env.REACT_APP_API_URL;
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const filterMenu = (data) => {
    setMenu([]);
    const set = new Set("");
    data.forEach((item) => set.add(item.category));
    const categories = Array.from(set);
    categories.forEach((category) => {
      let temp = [];
      data.forEach((item) => {
        if (item.category === category) {
          temp.push(item);
        }
      });
      setMenu((list) => [...list, temp]);
    });
  };

  const getMenu = async () => {
    setLoading(true);
    setFormValues({});
    await axios.get(`${url}/admin/getMenu`).then((res) => {
      filterMenu(res.data);
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
    await getMenu();
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
      setFormValues({});
    }
    setShow(true);
  };

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Menu mt-2">
      {loading && <Loader />}
      {!loading && (
        <div>
          <button className="new-button" onClick={handleShow}>
            Add New Item
          </button>
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
          {menu?.map((data, key) => (
            <div key={key}>
              <h1 className="category">{data[0]?.category}</h1>
              {data?.map((item, key) => (
                <Item
                  item={item}
                  key={key}
                  index={key}
                  editable={true}
                  handleShow={handleShow}
                />
              ))}
            </div>
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
                <div class="mb-2">
                  <label className="form-label">Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-2">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-2">
                  <label className="form-label">Logo:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="logo"
                    value={formValues.logo}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-2">
                  <label className="form-label">Price:</label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-2">
                  <label className="form-label">Category:</label>
                  <select
                    className="form-select"
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
                </div>
                <div class="mb-2 form-veg">
                  <label className="form-check-label">Veg:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="veg"
                      value="true"
                      checked={formValues.veg === "true"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">True</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="veg"
                      value="false"
                      checked={formValues.veg === "false"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">False</label>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              {!add && (
                <button
                  type="button"
                  className="btn btn-secondary btn-delete"
                  onClick={() => deleteItem(id, formValues)}
                >
                  Delete
                </button>
              )}
              {!add && (
                <button
                  type="button"
                  className="btn btn-primary btn-edit"
                  onClick={() => editItem(id, formValues)}
                >
                  Edit
                </button>
              )}
              {add && (
                <button
                  type="button"
                  className="btn btn-primary btn-add"
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
