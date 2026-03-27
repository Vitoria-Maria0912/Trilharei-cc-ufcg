import React from 'react';
import { Breadcrumb } from 'antd';
import { Outlet, Route, Routes } from 'react-router-dom';
import DisciplineCreateForm from '../components/Forms/discipline/create-update/DisciplineCreateForm.jsx';
import DisciplinePatchForm from '../components/Forms/discipline/create-update/DisciplinePatchForm.jsx';
import ShowOneDisciplineForm from '../components/Forms/discipline/getters/ShowOneDisciplineForm.jsx';
import ShowAllDisciplinesForm from '../components/Forms/discipline/getters/ShowAllDisciplinesForm.jsx';

const DisciplineService = () => {

  return (
    <div>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Disciplinas</Breadcrumb.Item>
        </Breadcrumb>
        <Routes>
            <Route path="/" element={ <ShowAllDisciplinesForm/> }/>
            <Route path="/create" element={ <DisciplineCreateForm/> }/> 
            <Route path="/update" element={ <DisciplinePatchForm/> }/> 
            <Route path="/getOne" element={ <ShowOneDisciplineForm/> }/>
        </Routes>
        <Outlet/>
    </div>
  );
};

export default DisciplineService;
