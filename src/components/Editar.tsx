import { useState, useEffect } from "react";
import { Pet } from "./Card";
import axios from "axios";
import { useParams } from "react-router-dom";

//função para editar o pet

export function Editar(props: any) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [formValues, setFormValues] = useState<Pet>({
    id: 0,
    name: "",
    type: "",
    age: 0,
    weight: 0,
  });

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/pets/${id}`)
      .then((res) => setFormValues(res.data));
  }, []);


  
  useEffect(() => {
    const response = axios
      .get(`http://localhost:3000/pets`)
      .then((response) => {
        setPets(response.data);
      });
    console.log("deu certo");
  }, []);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleUpdate(e : any) {
    axios
      .put(`http://localhost:3000/pets/${formValues.id}`, {
        age: String(formValues.age),
        weight: String(formValues.weight),
        type: String(formValues.type),
      })
      .then((response) => {
        setPets(pets.map((pet) => (pet.id === formValues.id ? formValues : pet)));
        console.log(response);
      });
  }
  return (
    <>
      <h3>Editar</h3>
      <form onSubmit={handleUpdate}>
        <label>Idade:</label>
        <div className="input">
          <input
            type="text"
            name="age"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </div>
        <label>Peso:</label>
        <div className="input">
          <input
            type="text"
            name="weight"
            value={formValues.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="button">
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => handleUpdate}
          >
            Salvar{"  "}
          </button>
        </div>
      </form>

      




    </>
  );
}
