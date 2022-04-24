import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Booking, Navbar } from './components';
import {
  Contacts,
  Footer,
  Header,
  Orders,
  TrackerMap,
  Trains,
} from './containers';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="map" element={<TrackerMap />} />
            <Route path="trains" element={<Trains />} />
            <Route path="tickets" element={<Booking />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="order" element={<Orders />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
