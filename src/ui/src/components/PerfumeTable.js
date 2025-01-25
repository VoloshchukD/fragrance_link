import { useQuery } from "react-query";
import axios from "axios";

const retrievePerfumes = async () => {
    const response = await axios.get(
      "/api/perfumes",
    );
    return response.data;
  };

function PerfumeTable() {

  const { isLoading, data } = useQuery("perfumes", retrievePerfumes);

  console.log('reposne: ' + JSON.stringify(data));

  const perfumes = data?._embedded?.perfumes || [];

  return (
    <>
      <h1>Perfumes</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {perfumes.map((perfume) => (
            <tr>
              <td>{perfume.name}</td>
              <td>{perfume.description}</td>
            </tr>)
            )}
        </tbody>
      </table>
    </>
  );
}

export default PerfumeTable;
