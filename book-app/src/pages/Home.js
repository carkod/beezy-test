/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

export default class Home extends Component {
  
  render() {
    return (
      <div className="home">
        <h1>This is Home</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
            consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
            vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
            enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
            ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
            Curabitur ullamcorper ultricies nisi.
          </p>
          <h3>Características de este proyecto</h3>
          <p>Concepto de "componetización funcional":</p>
          <ul>
            <li>Maximización del uso de la componetización (siempre que se pueda, componetizar, aunque en el futuro haya que refactorizar)</li>
            <li>Seguimiento de una logica funcional: Componentes presentacionales y componentes contenedores (e.g. Listing)</li>
            <li>Inmutabilidad, sobre todo en gestión de estados. Evitando el uso de herencia (inheritace) con las clases (difícil para alguien acostumbrado al concepto de OOP de Angular por ejemplo)</li>
            <li>No es necesario utilizar Redux en un proyecto como este, pero lo he metido por escabilidad</li>
            <li>Código simple, en caso de añadir nuevas feature, siempre crear nuevos HOC o simplemente funciones puras (return nextProp)</li>
            
          </ul>
      </div>
    );
  }
}
