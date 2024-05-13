import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.css'
import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import {Datatable} from './Datatable'
import LeftSidebar from './LeftSidebar';

function App() {
 return (
    <>
     <div className='flex' style={{flexDirection: 'row', width:'100%', height:'100vh'}}>
         <LeftSidebar/>
         <Datatable/>
     </div>

    </>
   
 )
}

export default App
