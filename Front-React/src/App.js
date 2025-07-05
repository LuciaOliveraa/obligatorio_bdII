// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VoteProvider } from './Context/VoteContext';
import { ROUTES } from './Constants/Routes';

// Lazy loading para mejor performance
const LoginTotem = React.lazy(() => import('./Views/LoginTotem/LoginTotem'));
const Welcome = React.lazy(() => import('./Views/Welcome/Welcome'));
const SelectVoteType = React.lazy(() => import('./Views/SelectVoteType/SelectVoteType'));
const SelectPartido = React.lazy(() => import('./Views/SelectPartido/SelectPartido'));
const SelectLista = React.lazy(() => import('./Views/SelectLista/SelectLista'));
const Blanco = React.lazy(() => import('./Views/Blanco/Blanco'));
const Anulado = React.lazy(() => import('./Views/Anulado/Anulado'));
const Lista = React.lazy(() => import('./Views/Lista/Lista'));
const VoteConfirmed = React.lazy(() => import('./Views/VoteConfirmed/VoteConfirmed'));

const LoginMesa = React.lazy(() => import('./Views/LoginMesa/LoginMesa'));
const BusquedaMesa = React.lazy(() => import('./Views/BusquedaMesa/BusquedaMesa'));
const ConfirmacionVotante = React.lazy(() => import('./Views/ConfirmacionVotante/ConfirmacionVotante'));
const VotanteHabilitado = React.lazy(() => import('./Views/VotanteHabilitado/VotanteHabilitado'));
const Estadisticas = React.lazy(() => import('./Views/Estadisticas/Estadisticas'));


const Loading = () => <div className="loading">Cargando...</div>;

function App() {
  return (
    <Router>
      <VoteProvider>
        <React.Suspense fallback={<Loading />}>
          <div className="app-container">
            <Routes>
              <Route path={ROUTES.LOGINTOTEM} element={<LoginTotem />} />
              <Route path={ROUTES.WELCOME} element={<Welcome />} />
              <Route path={ROUTES.VOTE_TYPE} element={<SelectVoteType />} />
              <Route path={ROUTES.PARTIDO} element={<SelectPartido />} />
              <Route path={ROUTES.LISTA} element={<SelectLista />} />
              <Route path={ROUTES.BLANCO} element={<Blanco />} />
              <Route path={ROUTES.ANULADO} element={<Anulado />} />
              <Route path={ROUTES.CONFIRM_LISTA} element={<Lista />} />
              <Route path={ROUTES.CONFIRMED} element={<VoteConfirmed />} />

              <Route path={ROUTES.LOGINMESA} element={<LoginMesa />} />
              <Route path={ROUTES.BUSQUEDAMESA} element={<BusquedaMesa />} />
              <Route path={ROUTES.CONFIRMACIONVOTANTE} element={<ConfirmacionVotante />} />
              <Route path={ROUTES.VOTANTEHABILITADO} element={<VotanteHabilitado />} />
              <Route path={ROUTES.ESTADISTICAS} element={<Estadisticas />} />
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </div>
        </React.Suspense>
      </VoteProvider>
    </Router>
  );
}

export default App;