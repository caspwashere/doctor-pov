import { useState } from "react";
import SideBarButton from './SideBarButton'
import { Link } from "react-router-dom";

const SideBarItem = ({label, iconSrc, href}) => {

    // const [activeItem, setActiveItem] = useState(false);

    // const onClick =  () => {
    //   setActiveItem(true)
    // }

    return (
        <>
            <SideBarButton title={label} icon={iconSrc} href={href} customStyles="bg-transparent text-white hover:border-slate-700 border-2 border-transparent sidebar transition-none">
            </SideBarButton>
        </>
    )
}


export default SideBarItem