import { useState, useEffect } from "react";
import axios from "axios";
import PerfumeCreateModal from "../components/modal/PerfumeCreateModal";
import { useNotification } from "../components/alert/NotificationContext";

function PerfumeTable() {
  const [perfumes, setPerfumes] = useState([]);
  const [brands, setBrands] = useState([]);
  const { showAlert } = useNotification();

  useEffect(() => {
    const fetchPerfumes = async () => {
      const response = await axios.get("/api/perfumes");
      setPerfumes(response.data || []);
    };
    const fetchBrands = async () => {
      const response = await axios.get("/api/brands");
      setBrands(response.data || []);
    };
    fetchPerfumes();
    fetchBrands();
  }, []);

  const addPerfume = (newPerfume) => {
    const brand = brands.find((brand) => brand.id === newPerfume.brand.id);

    if (brand) {
      newPerfume.brand.name = brand.name;
    }

    setPerfumes((prevPerfumes) => [...prevPerfumes, newPerfume]);
  };

  const editPerfume = (id, updatedPerfume) => {
    setPerfumes(
      perfumes.map((p) => (p.id === id ? { ...p, ...updatedPerfume } : p))
    );
  };

  const handleDelete = async (id) => {
    let url = `/api/perfumes/${id}`;
    axios
      .delete(url)
      .then(() => {
        setPerfumes((prevPerfumes) => prevPerfumes.filter((p) => p.id !== id));
        showAlert("Perfume deleted", "success");
      })
      .catch(() => showAlert("Error occured", "danger"));
  };

  return (
    <>
      <h1>Perfumes</h1>

      <PerfumeCreateModal
        addCallback={addPerfume}
        editCallback={editPerfume}
        brands={brands}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {perfumes.map((perfume) => (
            <tr key={perfume.id}>
              <td>{perfume.brand.name}</td>
              <td>{perfume.name}</td>
              <td>{perfume.description}</td>
              <td>
                <PerfumeCreateModal
                  perfumeData={perfume}
                  isEdit={true}
                  addCallback={addPerfume}
                  editCallback={editPerfume}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(perfume.id, perfumes)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PerfumeTable;
