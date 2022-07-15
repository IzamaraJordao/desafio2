import "./Card.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link} from "react-router-dom";
import { Editar } from "./Editar";


//import mui from "material-ui";

export type Pet = {
  id: number;
  name: string;
  type: string;
  age: number;
  weight: number;
  docil: boolean;
};

export function Card(props: any) {
  const navigate = useNavigate();
  function getPets(props: any) {
    if (props.id) if (props.name) return "Nome";
    if (props.type) return "Tipo";
    if (props.weight) return "Peso";
    return "";
  }
  const [pets, setPets] = useState<Pet[]>([]);

  const [checkbox, setCheckbox] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<Pet>({
    id : 0,
    name: "",
    type: "",
    age: 0,
    weight: 0,
    docil: true,
  });
  async function handleSubmit() {
    await axios.post("http://localhost:3000/pets", {
      name: String(formValues.name),
      type: String(formValues.type),
      age: Number(formValues.age),
      weight: Number(formValues.weight),
      docil: Boolean(formValues.docil),
    });
      Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    navigate(-1)
   
    
  }
  useEffect(() => {
    const response = axios
      .get(`http://localhost:3000/pets`)
      .then((response) => {
        setPets(response.data);
      });
    console.log(response);
  }, []);

  useEffect (() => {
    console.log("** handleInputChange ", formValues);

  },[]);
  //fazendo a filtragem dos pets por nome ou tipo
  function handleSearch() {
    if (formValues.name){
       axios
      .get(`http://localhost:3000/pets?name=${formValues.name}`)
      .then((response) => {
        setPets(response.data);
      });

    } else{
       axios
      .get(`http://localhost:3000/pets?type=${formValues.type}`)
      .then((response) => {
        setPets(response.data);
      });
    }
    
    const response = axios
      .get(`http://localhost:3000/pets?${formValues.type?`type=${formValues.type}`:""}${formValues.name?`name=${formValues.name}`:""}`)
      .then((response) => {
        setPets(response.data);
      });
    console.log(response);
  }
  useEffect(() => {
  console.log("**handleSearch", formValues);
  }, []);



  
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };




   function handleDelete (id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/pets/${id}`);
      setPets(pets.filter((pet) => pet.id !== id)); 
        Swal.fire('Deletado com Sucesso!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancelar', '', 'info')
      }
    })}
  
    //função para colocar o pet como docil ou não
    function handleDocile(id: number,name: string,type: string,age: number,weight: number,docil: boolean) {
      if(checkbox === false){
          setCheckbox(true)
         axios.put(`http://localhost:3000/pets/${id}`,{
              id:id,
              name:name,
              type:type,
              age:age,
              weight:weight,
              docil:true
          });
      }else{
          setCheckbox(false)
          axios.put(`http://localhost:3000/pets/${id}`,{
              id:id,
              name:name,
              type:type,
              age:age,
              weight:weight,
              docil:false
          });
      }
      }

  useEffect(() => {
      if(checkbox === true){
          setCheckbox(true)
      }
  },[])
  


    
 
  function handleEdit(event:any) {
    event.preventDefault();
    navigate(`/edit/${formValues.id}`);

  }
  return (
    <div className="card">
      <div className="Create-Pet">
      <label>Nome:</label>
      <div className="input">
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        </div>
        <label>Tipo:</label>
        <select  value ={formValues.type} name="type" onChange={handleInputChange}>
        <option value=" " selected> </option>
          <option value="Gato">Gato</option>
          <option value="Cachorro"> Cachorro</option>
          <option value="Hamster">Hamster</option>
          <option value="Passaro">Passarinho</option>
        </select>
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
        <label>Docil?</label>
        <div className="CheckBox">
          <input type="checkbox" name="docile" checked={formValues.docil}  onChange={() => handleDocile}/>
        </div>
        </div>
        <div className="botoes">
        <button type="submit"  className="btn btn-success" onClick={() => (handleSubmit())}>Salvar </button>
        <button type="button" className="btn btn-info" onClick={() =>(handleSearch())}> Buscar </button>
        </div>
      </div>
      <div className="List-Pet">
      <table className="info" >
      {pets.map((pet) => (
        <tbody key={pet.id} >
        <div className="card-group">
            <h1>
            <div className="card-header" >
           <td> <h6>Nome: {pet.name}</h6></td>
            </div>
          <h6>Tipo: {pet.type}</h6>
          <h6>Idade: {pet.age}</h6> 
         <h6>Peso: {pet.weight}</h6>
          <h6>Docil: {!!pet.docil ? "Sim" : "Não"}

           </h6>
         <div>
          <Link to={`/edit/${pet.id}`}>
            <button type="button" className="btn btn-warning" onClick={()=>(handleEdit(pet.id))}>Editar</button>
          </Link>
          <a>
              <button type="button" className="btn btn-danger" onClick={() => (handleDelete(pet.id))}>Deletar</button>
          </a>
          </div> 
          </h1>  
          </div>
        </tbody>
      ))}
      </table>
      </div>
    </div>
  );


 }
