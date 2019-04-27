import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { Button, Grid } from "@material-ui/core"
import './style.css';

import Personaje from "./Personaje"

import PersonajeComponent from "./PersonajeComponent"

class App extends Component {
  constructor() {
    super();
    this.state = {
      personajes: [new Personaje("Macri", 100, 16), new Personaje("Cristina", 100, 23), new Personaje("Massa", 80, 23)]
    };
  }

  onResetVidas(){  
    console.log("Aaah");
    this.setState({
      personajes: [new Personaje("Macri", 100, 16), new Personaje("Cristina", 100, 23), new Personaje("Massa", 80, 23)]
    });
  }

  onAtacarPressed(nombre) {
    // alert("Atacó " + nombre);
    const personajeQueAtaca = (this.state.personajes.filter(pj => pj.nombre == nombre))[0];
    const personajesHeridos = (this.state.personajes.filter(pj => pj.nombre !== nombre));

    personajesHeridos.forEach(personajeHerido => {
      personajeHerido.vida -= personajeQueAtaca.fuerza 
      personajeHerido.vida = personajeHerido.vida > 0 ? personajeHerido.vida : 0;
    });

    if(personajesHeridos.every(personajeHerido => personajeHerido.vida == 0)) {
      alert("Ganó " + personajeQueAtaca.nombre);
      return this.onResetVidas();
    }

    this.setState((prevState) => { 
      return {
        ...prevState,
        personajes: [...personajesHeridos, personajeQueAtaca]
      }
    }, () => {console.log(this.state)});
  }

  render() {

    let personajes = this.state.personajes.slice(0);

    personajes = personajes.sort((pj1, pj2) => {    
      var textA = pj1.nombre.toUpperCase();
      var textB = pj2.nombre.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return (
      <div>
        <h1>CoderHouse Arena!</h1>
        <Grid container>
          {
            personajes.map(personaje => <PersonajeComponent onAtacarPressed={(nombre) => this.onAtacarPressed(nombre)}>{personaje}</PersonajeComponent>)
          }
        </Grid>
        <Button onClick={() => this.onResetVidas()}>Resetear</Button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
