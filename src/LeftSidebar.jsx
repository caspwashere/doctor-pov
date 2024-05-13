import {useState} from 'react'
import { Link } from "react-router-dom";
import SideBarItem from './SideBarItem';
import logo from './assets/image.png';
import { Button } from 'primereact/button';

const LeftSidebar = () => {

  return (
    <div style={{backgroundColor:"#199A8E", height:'100vh'}}>
       
          <div className='pt-4 pb-5 flex' style={{fontSize: 18, flexDirection: 'column', alignItems:'center'}}>
              <img
                src={logo}
                height={60}
                width={60}
                alt='mascot'
              />
              <h1 style={{color:'#FFFFFF'}}>MediMate</h1>
          </div> 
       

        <div className=''>
          <SideBarItem label={'Manage Appointments'} href={'/edit'} iconSrc={"ppl.svg"}/>
          <SideBarItem label={'Settings'} href={'/edit'} iconSrc={"settings.png"}/>
          
         
        </div>
        <div style={{position: 'absolute', bottom:0, marginLeft:80, marginBottom:10}}>
          <Button   label='Logout' style={{backgroundColor:'#FFFFFF', color:'#41BC63'}} size="large">
            <img
            src='arrow.png'
            height={20}
            width={20}
            style={{marginLeft:10}}
            />
          </Button>
        </div>

    </div>
  )
}

export default LeftSidebar