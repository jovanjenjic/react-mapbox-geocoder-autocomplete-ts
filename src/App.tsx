import React from 'react';
import Geocoder from 'react-mapbox-geocoder-autocomplete';

function App() {
  return (
    <div>
      <Geocoder mapToken='pk.eyJ1Ijoiam92YW5qZW5qaWMiLCJhIjoiY2wzdWJvNG4wMGZ2YjNkcGZ2dm5kZm5nYyJ9.9bCbz74PqDnzQDpBqRenHw'/>
    </div>
  );
}

export default App;
