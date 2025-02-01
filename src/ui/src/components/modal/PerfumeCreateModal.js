import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";

function PerfumeCreateModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brandId: "",
  });

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        } else {
          console.error("Failed to load brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = async (e) => {
    const response = await fetch("/api/perfumes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        brand: { id: formData.brandId },
      }),
    });

    if (response.ok) {
      alert("Perfume added successfully!");
      setFormData({ name: "", description: "", brandId: "" });
    } else {
      alert("Error adding perfume");
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpen}>
        Launch Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Add New Perfume"
        onSave={handleSave}
      >
        <form>
          <div className="form-group">
            <label htmlFor="perfumeBrand">Perfume Brand</label>
            <select
              id="perfumeBrand"
              className="form-control"
              name="brandId"
              value={formData.brandId}
              onChange={handleChange}
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="perfumeName">Perfume Name</label>
            <input
              type="text"
              className="form-control"
              id="perfumeName"
              aria-describedby="emailHelp"
              placeholder="Perfume name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="perfumeDescription">Description</label>
            <textarea
              className="form-control"
              id="perfumeDescription"
              placeholder="Perfume name"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PerfumeCreateModal;
