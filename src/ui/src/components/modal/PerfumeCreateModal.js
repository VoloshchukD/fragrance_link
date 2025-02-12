import React from "react";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().nullable(),
  brandId: Yup.number()
    .required("Brand is required")
    .typeError("Brand must be selected"),
});

function PerfumeCreateModal({ perfumeData = null, isEdit = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const clearForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("brandId", "");
  };

  const [perfume, setPerfume] = useState({});

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

  const handleOpen = () => {
    if (isEdit) {
      console.log(perfumeData.id);
      let resp = getPerfume(perfumeData.id);
      setPerfume(resp);
      console.log(perfume);
    }

    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    clearForm();
  };
  const handleSave = async (data) => {
    const response = await fetch("/api/perfumes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        brand: { id: data.brandId },
      }),
    });

    if (response.ok) {
      handleClose();
    }
  };

  const handleEdit = async (data) => {
    alert("edit");
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
        onSave={handleSubmit(isEdit ? handleEdit : handleSave)}
      >
        <form>
          <div className="form-group">
            <label htmlFor="perfumeBrand">Perfume Brand</label>
            <select
              id="perfumeBrand"
              className="form-control"
              name="brandId"
              {...register("brandId")}
              disabled={isEdit}
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p className="text-danger">{errors.brandId.message}</p>
            )}
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
              {...register("name")}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="perfumeDescription">Description</label>
            <textarea
              className="form-control"
              id="perfumeDescription"
              placeholder="Perfume name"
              rows="3"
              name="description"
              {...register("description")}
            ></textarea>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PerfumeCreateModal;

const getPerfume = async (perfumeId) => {
  let url = `/api/perfumes/${perfumeId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log(JSON.stringify(data));
  return data;
};
