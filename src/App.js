import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import TableComponent from "./components/TableComponent";
import Home from "./pages/Home";
import initialData from "./data/initialData";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState(initialData);

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.keys(data).map((key) => (
            <Route
              key={key}
              path={`/${key}`}
              element={
                <TableComponent
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  dataKey={key}
                  data={data}
                  setData={setData}
                />
              }
            />
          ))}
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
