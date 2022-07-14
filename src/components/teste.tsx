
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {Card} from './components/Card';
// import { BrowserRouter, Routes , Route } from 'react-router-dom';

// //import Cadastro from './components/Cadastro';
// export function Texte
// type Pet = {
//     id?: number;
//     name: string;
//     type: string;
//     age: number;
//     weight: number;
// }

// function App() {
//   const [pets, setPets] = useState<Pet[]>([]);
//   //const [nome, setNome] = useState('');
//   const [formValues, setFormValues] = useState<Pet>({ name: '', type: '', age: 0, weight: 0 });

//   async function handleSubmit  (event:any)  {
//     event.preventDefault();
//     const response = axios.post('http://localhost:3001/pets', 
//       { name: String (formValues.name),
//         type: String (formValues.type),
//         age: Number (formValues.age),
//         weight: Number (formValues.weight)
//     })
    
    
      
//     }
    
//   useEffect(() => {
//      const response = axios.get('http://localhost:3001/pets').then(response => { setPets(response.data) });
//      console.log(response);
//   }, []);

//   const handleInputChange = (event:any) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   }

//   console.log("** handleInputChange ", formValues);
//   return (
//     <div className="App">
//       <form>
//         <label>Nome:</label>
//         <input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
//         <label>Tipo:</label>
//         <select name="type" onChange={handleInputChange}>
//           <option value="gato">Gato</option>
//           <option value="cachorro" selected>Cachorro</option>
//           <option value="Hamster">Hamster</option>
//           <option value="Passarinho">Passarinho</option>
//         </select>
//         <label>Idade:</label>
//         <input type="number" name="age" value={formValues.age} onChange={handleInputChange} />
//         <label>Peso:</label>
//         <input type="number" name="peso" value={formValues.weight} onChange={handleInputChange} />
//         <button type="submit" onClick={handleSubmit}>Enviar</button>

//       </form>
//       {pets.map(pet => (
          
//       <div key={pet.id}>
//         <p>nome:{pet.name}</p>
//         <p>Tipo:{pet.type}</p>
//         <p>Idade:{pet.age}</p>
//         <p>Peso:{pet.weight}</p>
                
//       </div>)
      
//       )}
      
//       <Card></Card>
//     </div>
//   );
// }

// export default App;