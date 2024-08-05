import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddressStep.css";

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
  }, []);

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

  return (
    <div className="address-step-container">
      <div className="address-list">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className="address-item">
              <p>{`${address.firstName} ${address.lastName}`}</p>
              <p>{address.streetAddress}</p>
              <p>{`${address.city}, ${address.state}, ${address.zipcode}`}</p>
              <p>{address.mobile}</p>
              <button onClick={() => handleDelete(address._id)}>Delete</button>
              <button onClick={() => onNext(address._id)}>Select</button>
            </div>
          ))
        ) : (
          "No Address Found"
        )}
      </div>
      <div className="add-address-form">
        <p className="form-label">First Name:</p>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newAddress.firstName}
          onChange={handleChange}
        />
        <p className="form-label">Last Name:</p>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newAddress.lastName}
          onChange={handleChange}
        />
        <p className="form-label">Street Address:</p>
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={newAddress.streetAddress}
          onChange={handleChange}
        />
        <p className="form-label">City:</p>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleChange}
        />
        <p className="form-label">State:</p>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleChange}
        />
        <p className="form-label">Zipcode:</p>
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={newAddress.zipcode}
          onChange={handleChange}
        />
        <p className="form-label">Mobile:</p>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={newAddress.mobile}
          onChange={handleChange}
        />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
};

export default AddressStep;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddressStep.css";

// const AddressStep = ({ onNext }) => {
//     const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState({
//     firstName: "",
//     lastName: "",
//     streetAddress: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     mobile: "",
//   });

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/address/", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//         setAddresses(response.data);
//       } catch (error) {
//         console.error("Error fetching addresses", error);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/address/delete/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//       setAddresses((prev) => prev.filter((address) => address._id !== id));
//     } catch (error) {
//       console.error("Error deleting address", error);
//     }
//   };

//   const handleChange = (e) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
//   };

//   const handleAddAddress = async () => {
//     try {
//       const response = await axios.post("http://localhost:5001/api/address/create", newAddress, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//       setAddresses((prev) => [...prev, response.data]);
//       setNewAddress({
//         firstName: "",
//         lastName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         mobile: "",
//       });
//     } catch (error) {
//       console.error("Error adding address", error);
//     }
//   };

//   return (
//     <div className="address-step-container">
//       <div className="address-list">
//         {addresses.length>0 ? (addresses.map((address) => (
//           <div key={address._id} className="address-item">
//             <p>{`${address.firstName} ${address.lastName}`}</p>
//             <p>{address.streetAddress}</p>
//             <p>{`${address.city}, ${address.state}, ${address.zipcode}`}</p>
//             <p>{address.mobile}</p>
//             <button onClick={() => handleDelete(address._id)}>Delete</button>
//           </div>
//         ))):"No Address Founded"}
//       </div>
//       <div className="add-address-form">
//       <p className="form-label">First Name:</p>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={newAddress.firstName}
//           onChange={handleChange}
//         />
//         <p className="form-label">Last Name:</p>
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={newAddress.lastName}
//           onChange={handleChange}
//         />
//         <p className="form-label">Street Address:</p>
//         <input
//           type="text"
//           name="streetAddress"
//           placeholder="Street Address"
//           value={newAddress.streetAddress}
//           onChange={handleChange}
//         />
//         <p className="form-label">City:</p>
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={newAddress.city}
//           onChange={handleChange}
//         />
//         <p className="form-label">State:</p>
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={newAddress.state}
//           onChange={handleChange}
//         />
//         <p className="form-label">Zipcode:</p>
//         <input
//           type="text"
//           name="zipcode"
//           placeholder="Zipcode"
//           value={newAddress.zipcode}
//           onChange={handleChange}
//         />
//         <p className="form-label">Mobile:</p>
//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile"
//           value={newAddress.mobile}
//           onChange={handleChange}
//         />
//         <button onClick={handleAddAddress}>Add Address</button>
//         <button onClick={onNext}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default AddressStep;
