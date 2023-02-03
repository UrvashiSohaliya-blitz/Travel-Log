import React from 'react';

import 'antd/dist/reset.css';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import Navbar from './componants/Navbar/Navbar';

const App = () => {

  return (
    <div className='App'>
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;
