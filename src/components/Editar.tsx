import { useState, useEffect } from "react";
import { Pet } from "./Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//função para editar o pet

export function Editar(props: any) {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [formValues, setFormValues] = useState<Pet>({
    id: 0,
    name: "",
    type: "",
    age: 0,
    weight: 0,
    docil: true,
  });

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/pets/${id}`)
      .then((res) => setFormValues(res.data));
  }, []);


  
  useEffect(() => {
    const response = axios
      .get(`http://localhost:3000/pets/{id}`)
      .then((response) => {
        setPets(response.data);
      });
    console.log("deu certo");
  }, []);
  async function handleSubmit() {
    await axios.put(`http://localhost:3000/pets/${id}`, {
      name: String(formValues.name),
      type: String(formValues.type),
      age: Number(formValues.age),
      weight: Number(formValues.weight),
      docil: Boolean(formValues.docil),
    });
     await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    navigate(-1)
   
    
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleUpdate(e : any) {
    console.log(formValues)
    axios
      .put(`http://localhost:3000/pets/${formValues.id}`, {
        name:String (formValues.name),
        age: String(formValues.age),
        weight: String(formValues.weight),
        type: String(formValues.type),
        docil:Boolean(formValues.docil),
      })
      .then((response) => {
        setPets(pets.map((pet) => (pet.id === formValues.id ? formValues : pet)));
        console.log(response);
      });
  }
  return (
    <>
      <h3>Editar</h3>
      <form>
        <label>Nome </label>
        <div className="input">
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <label>Tipo </label>
        <div className="input">
          <input
            type="text"
            name="type"
            value={formValues.type}
            onChange={handleInputChange}
          />
        </div>
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
        <label>Docil:</label>
        <div className="input">
          <input type="checkbox" name="docil" checked={formValues.docil} onChange={handleInputChange} />
        </div>
        <div className="button">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Salvar{" "}
          </button>
        </div>
      </form>

      




    </>
  );
}
