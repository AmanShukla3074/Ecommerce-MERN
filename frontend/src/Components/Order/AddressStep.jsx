import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddressStep.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddressStep = ({ onNext }) => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    mobile: "",
  });
  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/address/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/address/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses((prev) => prev.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/address/create",
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses((prev) => [...prev, response.data]);
      setNewAddress({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error adding address", error);
    }
  };

  const handleEdit = (address) => {
    setNewAddress({ ...address });
    setEditingAddressId(address._id);
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/address/update/${editingAddressId}`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses((prev) =>
        prev.map((address) =>
          address._id === editingAddressId ? { ...address, ...newAddress } : address
        )
      );
      setEditingAddressId(null);
      setNewAddress({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  return (
    <>
    <div className="address-header">Select Address</div>
    <div className="address-step-container">
      <div className="address-list">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className="address-item">
              <p className="address-line"><span className="address-line-header">Name: </span>{`${address.firstName} ${address.lastName}`}</p>
              <p className="address-line"><span className="address-line-header">Address: </span>{address.streetAddress}</p>
              <p className="address-line"><span className="address-line-header">  </span>{`${address.city}, ${address.state}, ${address.zipcode}`}</p>
              <p className="address-line"><span className="address-line-header">Mobile:</span>{address.mobile}</p>
              {/* <button onClick={() => handleDelete(address._id)}>Delete</button>
              <button onClick={() => handleEdit(address)}>Edit</button>
              <button onClick={() => onNext(address._id)}>Select</button> */}
              <div className="address-buttons">
              <div onClick={() => onNext(address._id)} className="address-select-button">Select Address</div>
              <FaEdit className="address-button" onClick={() => handleEdit(address)}/>
              <MdDelete className="address-button" onClick={() => handleDelete(address._id)}/>
              </div>
            </div>
          ))
        ) : (
          "No Address Found"
        )}
      </div>
      <div className="add-address-form">
        <p className="address-form-line">First Name:</p>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newAddress.firstName}
          onChange={handleChange}
           
        />
        <p className="address-form-line">Last Name:</p>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newAddress.lastName}
          onChange={handleChange}
           
        />
        <p className="address-form-line">Street Address:</p>
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={newAddress.streetAddress}
          onChange={handleChange}
           
        />
        <p className="address-form-line">City:</p>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleChange}
           
        />
        <p className="address-form-line">State:</p>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleChange}
           
        />
        <p className="address-form-line">Zipcode:</p>
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={newAddress.zipcode}
          onChange={handleChange}
           
        />
        <p className="address-form-line">Mobile:</p>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={newAddress.mobile}
          onChange={handleChange}
           
        />
        {editingAddressId ? (
          <div onClick={handleUpdateAddress} className="address-submit-form">Update Address</div>
        ) : (
          <div onClick={handleAddAddress} className="address-submit-form">Add Address</div>
        )}
      </div>
    </div>
    </>
  );
};

export default AddressStep;