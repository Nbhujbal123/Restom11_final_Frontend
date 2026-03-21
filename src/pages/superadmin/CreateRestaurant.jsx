import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaPlus
} from "react-icons/fa";

import { API_BASE_URL, FRONTEND_URL } from "../../config/api";

const CreateRestaurant = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔴 Token check
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/superadmin/login");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/superadmin/create-restaurant`,
        {
          restaurantName: formData.restaurantName,
          restaurantEmail: formData.email,
          restaurantPhone: formData.phone,
          adminName: formData.ownerName,
          adminEmail: formData.email,
          adminMobile: formData.phone,
          adminPassword: "admin123"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔴 Safe response handling
      const siteCode = res?.data?.restaurant?.siteCode;

      if (!siteCode) {
        throw new Error("SiteCode not received from server");
      }

      // ✅ Generate links
      const restaurantLink = `${FRONTEND_URL}?siteCode=${siteCode}`;
      const adminLink = `${FRONTEND_URL}/admin?siteCode=${siteCode}`;

      alert(
`✅ Restaurant Created Successfully!

📌 Site Code: ${siteCode}

🌐 Customer Link:
${restaurantLink}

🔐 Admin Login:
${adminLink}

🔑 Default Password: admin123`
      );

      navigate("/superadmin/dashboard");

    } catch (error) {

      console.error("Create Restaurant Error:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4" style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Create Restaurant</h3>
          <p className="text-muted mb-0">
            Add a new restaurant to your platform
          </p>
        </div>

        <button
          className="btn btn-light shadow-sm"
          onClick={() => navigate("/superadmin/dashboard")}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>

      {/* FORM */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Restaurant Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Restaurant Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaStore /></span>
                  <input
                    type="text"
                    name="restaurantName"
                    className="form-control"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Owner Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input
                    type="text"
                    name="ownerName"
                    className="form-control"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Creating..." : (
                  <>
                    <FaPlus className="me-2" />
                    Create Restaurant
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default CreateRestaurant;
