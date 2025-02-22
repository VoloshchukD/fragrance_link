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

const editPefumeValidationSchema = schema.omit(["brandId"]);

function PerfumeCreateModal({
  perfumeData = null,
  isEdit = false,
  addCallback,
  editCallback,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isEdit ? editPefumeValidationSchema : schema),
  });

  const clearForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("brandId", "");
  };

  useEffect(() => {
    if (isEdit && perfumeData) {
      setValue("name", perfumeData.name);
      setValue("description", perfumeData.description);
      setValue("brandId", perfumeData.brand.id);
    }
  }, [isEdit, perfumeData, setValue]);

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    if (!isEdit) {
      clearForm();
    }
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
      const added = await response.json();
      addCallback(added);
      handleClose();
    }
  };

  const handleEdit = async (data) => {
    const response = await fetch("/api/perfumes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: perfumeData.id,
        name: data.name,
        description: data.description,
        brand: { id: perfumeData.brand.id },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedPerfume = await response.json();
    console.log("Updated perfume:", updatedPerfume);

    editCallback(perfumeData.id, updatedPerfume);

    if (response.ok) {
      handleClose();
    }
  };

  const formObject = isEdit
    ? {
        title: "Edit Perfume",
        submit: "Edit",
        cancel: "Cancel",
        launchModalClassName: "btn btn-warning btn-margin",
        launchModalButtonText: "Edit"
      }
    : {
        title: "Add Perfume",
        submit: "Create",
        cancel: "Cancel",
        launchModalClassName: "btn btn-primary btn-margin",
        launchModalButtonText: "Add New Perfume"
      };

  return (
    <div style={{ display: 'inline-block' }}>
      <button className={formObject.launchModalClassName} onClick={handleOpen}>
        {formObject.launchModalButtonText}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSubmit(isEdit ? handleEdit : handleSave)}
        formText={formObject}
      >
        <form>
          <div className="form-group">
            <label htmlFor="perfumeBrand">Perfume Brand</label>
            {isEdit ? (
              <input
                type="text"
                className="form-control"
                id="perfumeName"
                aria-describedby="emailHelp"
                placeholder="Perfume name"
                value={perfumeData.brand.name}
                disabled
              />
            ) : (
              <select
                id="perfumeBrand"
                className="form-control"
                name="brandId"
                {...register("brandId")}
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            )}
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

  return data;
};
