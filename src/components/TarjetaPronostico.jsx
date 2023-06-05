import {Card } from "react-bootstrap";

const TarjetaPronostico = ({clima}) => {
  return (
    <section>
      <h2 className="text-center  text-light my-5">Pronostico</h2>
      {clima.map((tiempo, indice) => (
        <Card key={indice}>
          <Card.Header>
            El tiempo en 
          </Card.Header>
          <Card.Body>
            <Card.Title>{clima.name}</Card.Title>
            <Card.Text>
              <h3>La temperatura es de {Math.round(clima.main)} °C</h3>
              <h4>Descripcion: {clima.weather}</h4>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
};

export default TarjetaPronostico;
