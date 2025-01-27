import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const retrievePerfumes = async () => {
  const response = await axios.get("/api/perfumes");
  return response.data;
};

function PerfumeTable() {
  const { isLoading, data } = useQuery("perfumes", retrievePerfumes);

  console.log("reposne: " + JSON.stringify(data));

  const perfumes = data?._embedded?.perfumes || [];

  return (
    <>
      <h1>Perfumes</h1>
      <button type="button" class="btn btn-primary add">Add New</button>
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
            <tr>
              <td>###</td>
              <td>{perfume.name}</td>
              <td>{perfume.description}</td>
              <td>
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-danger delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PerfumeTable;
