import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TarjetaPronostico from "./TarjetaPronostico";
const Formulario = () => {
  const [clima, setClima] = useState([]);
  const [[ubicacion, setUbicacion]] = useState("");
  const [pais, setPais] = useState("");

  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  function enviar (data){
    console.log(data)
    consultarApi(data);
    console.log(consultarApi)
    reset();

  
   }

  useEffect(() => {
    consultarApi();
  }, []);

  

  const consultarApi = async (ubicacion,pais) => {
    try {
      const respuesta =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ubicacion},${pais}&appid={5868607083021c6a9d47aecbe6262c1b}
            `);
      const data = await respuesta.json();
      setClima([data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="main">
      <h1 className="text-center display-1 fw-semibold text-light">
        Consultar el clima
      </h1>
      <Container>
         <Form onSubmit={handleSubmit(enviar)}>
        <Form.Group className="mb-3" controlId="ubicacion">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            {...register("ubicacion", {
              required: true,
              minLength: 3,
              maxLength: 57,
            })}
            placeholder="Ej Banda del rio Sali"
            
            value={ubicacion}
          />
          {errors.ubicacion?.type === "required" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌ Ingrese una Ciudad
             </div>
              )}
         {errors.ubicacion?.type === "minLength" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌ La ciudad ingresada debe tener minimo 3 caracteres
             </div>
              )}
         {errors.ubicacion?.type === "maxLength" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌ La ciudad ingresada no debe superar los 57 caracteres
             </div>
              )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="pais">
          <Form.Label>Pais</Form.Label>
          <Form.Control
            type="text"
            {...register("pais", {
              required: true,
              minLength: 3,
              maxLength: 57,
            })}
            placeholder="Ej Argentina"
            
            value={ubicacion}
          />
          {errors.pais?.type === "required" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌ Ingrese un Pais
             </div>
              )}
         {errors.pais?.type === "minLength" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌ El Pais ingresado debe tener minimo 3 caracteres
             </div>
              )}
         {errors.pais?.type === "maxLength" && (
               <div className="alert alert-danger m-3 text-center fw-semibold fst-italic" role="alert">
               ❌  El Pais ingresado no debe superar los 57 caracteres
             </div>
              )}
        </Form.Group>
        

        <Button variant="primary" type="submit">
          Consultar
        </Button>
      </Form>

      <hr />

      <TarjetaPronostico clima={clima}></TarjetaPronostico>
      </Container>
     
    </section>
  );
};

export default Formulario;
