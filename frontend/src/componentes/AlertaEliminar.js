import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

export default function AlertaEliminar( props ) {
  return (
    <>
      <Modal onClick={() => props.setShowAlert(false)}>
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
      </Modal>
    </>
  );
}

const Alerta = styled(Alert)`
  position: absolute;
`;

const Modal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, .2);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;