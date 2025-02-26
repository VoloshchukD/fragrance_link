import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().nullable(),
  brandId: Yup.number()
    .required("Brand is required")
    .typeError("Brand must be selected"),
});

const editPerfumeValidationSchema = schema.omit(["brandId"]);

function PerfumeCreateModal({
  perfumeData = null,
  isEdit = false,
  addCallback,
  editCallback,
  brands = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isEdit ? editPerfumeValidationSchema : schema),
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
    axios
      .post(
        "/api/perfumes",
        {
          name: data.name,
          description: data.description,
          brand: { id: data.brandId },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        addCallback(data.data);
        handleClose();
      });
  };

  const handleEdit = async (data) => {
    axios
      .put(
        "/api/perfumes",
        {
          id: perfumeData.id,
          name: data.name,
          description: data.description,
          brand: { id: perfumeData.brand.id },
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((updated) => {
        editCallback(perfumeData.id, updated.data);
        handleClose();
      });
  };

  const modalConfig = isEdit
    ? {
        title: "Edit Perfume",
        submit: "Edit",
        cancel: "Cancel",
        launchModalClassName: "btn btn-warning btn-margin",
        launchModalButtonText: "Edit",
      }
    : {
        title: "Add Perfume",
        submit: "Create",
        cancel: "Cancel",
        launchModalClassName: "btn btn-primary btn-margin",
        launchModalButtonText: "Add New Perfume",
      };

  return (
    <div style={{ display: "inline-block" }}>
      <button className={modalConfig.launchModalClassName} onClick={handleOpen}>
        {modalConfig.launchModalButtonText}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSubmit(isEdit ? handleEdit : handleSave)}
        formText={modalConfig}
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
