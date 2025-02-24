import { useState, useEffect } from "react";
import axios from "axios";
import PerfumeCreateModal from "./modal/PerfumeCreateModal";
import Alert from "./Alert";

const retrievePerfumes = async () => {
  const response = await axios.get("/api/perfumes");
  return response.data;
};

function PerfumeTable() {
  const [perfumes, setPerfumes] = useState([]);
  const [alertTrigger, setAlertTrigger] = useState(0);

  const triggerAlert = () => {
    setAlertTrigger((v) => v + 1);
  };

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const data = await retrievePerfumes();
        setPerfumes(data || []);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
      }
    };

    fetchPerfumes();
  }, []);

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
    const response = await fetch(url, {
      method: "DELETE",
    }).then(() => {
      setPerfumes(perfumes.filter((p) => p.id !== id));
      triggerAlert();
    });
  };

  return (
    <>
      <Alert message="This is an alert message!" trigger={alertTrigger} />
      <h1>Perfumes</h1>

      <PerfumeCreateModal addCallback={addPerfume} editCallback={editPerfume} />

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
