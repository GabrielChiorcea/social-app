import { Outlet } from 'react-router-dom';
import styles from './Form.module.scss';
import FormInputs from './FormInputs';
import CheckMark from '../helpers/CheckMark';
import { useSelector } from 'react-redux';
import React from 'react';

export const Form = () => {
  const writtenJoke = useSelector((state) => state.jo.writtenJoke);
  const deleteAccount = useSelector((state) => state.jo.deleteAccount);

  return (
    <div className={styles.root}>
      <Outlet></Outlet>
      {deleteAccount === true && (
        <h3 className={styles.text}>
          Contul va fi sters, multumim pentru activitate, va vom trimite un
          email de confirmare a stergerii contului.
        </h3>
      )}
      {!deleteAccount && !writtenJoke && (
        <h3 className={styles.formHeder}>
          Daca ai o postare nu ezita sa o scri! Scrie mai jos si trimite, succes
          !
        </h3>
      )}

      {writtenJoke && !deleteAccount && <CheckMark />}
      {!writtenJoke && !deleteAccount && <FormInputs />}
    </div>
  );
};

export default Form;
