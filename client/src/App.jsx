import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdatePage />}
            />
            <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantDetailPage />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
