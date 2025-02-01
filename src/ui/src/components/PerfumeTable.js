import { useQuery } from "react-query";
import axios from "axios";
import PerfumeCreateModal from "./modal/PerfumeCreateModal";

const retrievePerfumes = async () => {
  const response = await axios.get("/api/perfumes");
  return response.data;
};

function PerfumeTable() {
  const { isLoading, data } = useQuery("perfumes", retrievePerfumes);

  const perfumes = data || [];

  return (
    <>
      <h1>Perfumes</h1>

      <PerfumeCreateModal />

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
                <button type="button" className="btn btn-warning">
                  Edit
                </button>
                <button type="button" className="btn btn-danger delete">
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
