import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function useFetch(URL) {
  let [Products, setproducts] = useState([]);
  let [error, seterror] = useState("");
  let [looding, setlooding] = useState(true);

  useEffect(() => {
    let FetchApi = async () => {
      try {
        let response = await axios.get(URL);
        setproducts(response.data);

      } catch (error) {
        seterror(error.message);
      } finally {
        setlooding(false);
      }
    };
    FetchApi();
  }, []);
  return { Products, error, looding,setproducts};
}
export default useFetch;
