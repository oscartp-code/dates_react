import {useState, useEffect} from "react";
import Error from "./Error";

const Form = ({patients, setPatients,patient,setPatient}) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [register, setRegister] = useState('');
  const [symptom, setSymptom] = useState('');

  const [error, setError] = useState(false);

  useEffect(() =>{
    if(Object.keys(patient).length >0){
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setRegister(patient.register)
      setSymptom(patient.symptom)
    }
  },[patient])
  

  const generateId = () => {
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);

    return random + date
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion
    if([name,owner,email,register,symptom].includes('')){

      setError(true);
      return;
    }

      setError(false)

      //Object from Patients
      const objectPatient = {
        name,
        owner,
        email,
        register,
        symptom,
        id: generateId()
      }
      if(patient.id){
        //Editando
        objectPatient.id = patient.id
        const patientstUpdate = patients.map(patientState =>patientState.id === patient.id ? objectPatient : patientState)
        setPatients(patientstUpdate)
        setPatient({})
      }else{
        //Nuevo registro
        objectPatient.id = generateId();
        setPatients([...patients, objectPatient]);

      }



      //rset form
      setName('')
      setOwner('')
      setEmail('')
      setRegister('')
      setSymptom('')
  }

  

  return (
    <div className="md:w-1/2 lg:w-2/5 ml-5 mr-3">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-7" onSubmit={handleSubmit}>

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
          <div className="mb-5">
            <label htmlFor="pet" className="block text-gray-700 uppercase">Nombre mascota</label>
            <input 
              id="pet"
              type="text"
              placeholder="Nombre de La Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="owner" className="block text-gray-700 uppercase">Nombre Propietario</label>
            <input 
              id="owner"
              type="text"
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={owner}
              onChange={(e)=> setOwner(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase">Email</label>
            <input 
              id="email"
              type="email"
              placeholder="Coloca tu email aqui"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="register" className="block text-gray-700 uppercase">Alta</label>
            <input 
              id="register"
              type="date"
              placeholder="Fecha dada de alta"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={register}
              onChange={(e)=> setRegister(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="symptom" className="block text-gray-700 uppercase">Sintomas</label>
            <textarea
              id="symptom"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los sintomas"
              value={symptom}
              onChange={(e)=> setSymptom(e.target.value)}
            />
          </div>
          
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={patient.id ? 'Editar paciente' : 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Form
