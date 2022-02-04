import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

export default function AlertaEliminar( props ) {
  return (
    <>
      <Alerta variant="danger" onClose={() => props.setShowAlert(false)} dismissible>
        <Alert.Heading>¿Queres eliminar tu imagen?</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button 
            onClick={() => {props.setShowAlert(false); props.setDeleteImg(true); }} 
            variant="outline-danger">
            Eliminar
          </Button>
        </div>
      </Alerta>
    </>
  );
}

const Alerta = styled(Alert)`
  position: absolute;
`;