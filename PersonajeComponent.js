import React, {Component} from "react";
import { Grid, Button } from "@material-ui/core"

class PersonajeComponent extends Component {
  render(){
  const {onAtacarPressed, children: personaje } = this.props;
  return  <Grid item xs={4}>
            <h2>{personaje.nombre}</h2>
            <p>Vida: {personaje.vida}</p>
            <Button onClick={() => onAtacarPressed(personaje.nombre)} >Atacar</Button>
          </Grid>
  }
}

export default PersonajeComponent;