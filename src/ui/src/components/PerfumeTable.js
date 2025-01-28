import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const retrievePerfumes = async () => {
  const response = await axios.get("/perfumes");
  return response.data;
};

function PerfumeTable() {
  const { isLoading, data } = useQuery("perfumes", retrievePerfumes);

  console.log("reponsee: " + JSON.stringify(data));
  // console.log("reposne: " + JSON.stringify(data[1]));

  const perfumes = data || [];

  return (
    <>
      <h1>Perfumes</h1>
      <button type="button" className="btn btn-primary add">Add New</button>
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
              <td>###</td>
              <td>{perfume.name}</td>
              <td>{perfume.description}</td>
              <td>
                <button type="button" className="btn btn-warning">Edit</button>
                <button type="button" className="btn btn-danger delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PerfumeTable;
