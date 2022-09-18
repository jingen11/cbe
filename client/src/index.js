import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { rootReducer } from './reducers';
import LoginPage from './features/login/LoginPage';
import HomePage from './features/home/HomePage';
import WorkerPage from "./features/worker/WorkerPage";
import VehiclePage from "./features/vehicle/VehiclePage";
import AttendancePage from "./features/attendance/AttendancePage";
import './Global.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/workers" element={<WorkerPage />} />
          <Route path="/vehicles" element={<VehiclePage />} />
          <Route path="/attendances" element={<AttendancePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);