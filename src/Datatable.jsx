import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Dropdown} from 'primereact/dropdown'
import './index.css'
import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { SplitButton } from "primereact/splitbutton";

export const Datatable = () => {
    const [products, setProducts] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    //split button items
    const items = (data) => ([
        {
          label: "View",
          icon: "pi pi-user",
          command: () => {
            console.log(data.fname);
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            console.log(data.fname);
            setProducts(products.filter((product) => product.fname != data.fname))
          },
        },
      ]);
      

      const splitBtn = (d) => {
        console.log(d.fname);
       
        /* Getting data here*/
      };

      const buttonTemplate = (data) => (
        <>
          <SplitButton
            label="View"
            className="p-button-sm"
            model={items(data)}
            onClick={(e) => splitBtn(data)}
          ></SplitButton>
        </>
      );
      

    useEffect(() => {
        // ProductService.getProductsSmall().then((data) => setProducts(data));
        // initFilters();
         fetch('http://127.0.0.1:5000/getAllPatients')
        .then(response => response.json())
        .then(data => { setProducts(data); initFilters(); });
    }, []);
  
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
  
    const imageBodyTemplate = (product) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    };
  
    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };


    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };
  
    const statusBodyTemplate = (product) => {
        return <Tag  
                  value={product.inventoryStatus} 
                  severity={getSeverity(product)}
                //   onClick={() =>  window.open('https://react.dev', '_blank') }
                >
                 
                  </Tag>;
    };

    const reportBodyTemplate = (product) => {
        return <Button  
                  label='View' 
                  severity={"info"}
                  onClick={() =>  window.open('https://react.dev', '_blank') }
                >
                 
                  </Button>;
    };
  
    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'OPEN':
                return 'success';
  
            case 'IN PROCESS':
                return 'warning';
  
            case 'COMPLETED':
                return 'danger';
  
            default:
                return null;
        }
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const clearFilter = () => {
      initFilters();
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            {/* <Button icon="pi pi-refresh" rounded raised /> */}
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        </div>
    );
    const footer = `In total there are ${products ? products.length : 0} patients.`;
    const [statuses] = useState(['LOWSTOCK', 'OUTOFSTOCK', 'INSTOCK']);

    const statusFilterTemplate = (options) => {
      return <Dropdown value={options.inventoryStatus} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusBodyTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

  

    const initFilters = () => {
      setFilters({
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
          representative: { value: null, matchMode: FilterMatchMode.IN },
          date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
          balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
          activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
          verified: { value: null, matchMode: FilterMatchMode.EQUALS }
      });
      setGlobalFilterValue('');
  };
  
    return (
        <div className="card" style={{width:'100%', height:'100vh'}}>
            <h1>Manage Appointments</h1>
            {products.length > 1 ? <DataTable showGridlines filters={filters} globalFilterFields={['fname', 'country.name', 'representative.name', 'status']} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="fname" header="First Name"   sortable style={{ width: '20%' }}></Column>
                <Column field="lname" header="Last Name"  sortable style={{ width: '20%' }}></Column>
                <Column field="gender" header="Gender"  sortable style={{ width: '10%' }}></Column>
                <Column field="DOB" header="DOB"  sortable style={{ width: '10%' }}></Column>
                <Column header="Status" body={statusBodyTemplate} style={{ width: '15%' }}></Column>
               <Column header="Report" body={buttonTemplate} style={{ width: '10%' }}></Column>
                {/* <Column field="price" header="Last Name" body={priceBodyTemplate} sortable style={{ width: '25%' }}></Column>
                <Column field="category" header="Gender"  sortable style={{ width: '25%' }}></Column>
                <Column field="rating" header="Date of Birth" body={ratingBodyTemplate}  sortable style={{ width: '25%' }}></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column header="Report" body={buttonTemplate}></Column> */}
            </DataTable> : <div>loading </div> }
        </div>
    );
}