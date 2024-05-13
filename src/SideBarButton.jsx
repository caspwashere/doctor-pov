import { Link } from "react-router-dom"
import './index.css'

const SideBarButton = ({title, customStyles, icon, href}) => {
    

    return (
        <button  class={`h-13 px-4 py-2 inline-flex items-center justify-center font-bold  ${customStyles}
        `}
          onClick={()=>{console.log(title)}}     
        >
           <div      class='w-full mt-3 flex' style={{flexDirection:'row-reverse', fontSize:18}}>
              
                 
                    <div  id='sbutton' class="ml-3 mt-2 ">
                        {title}
                    </div>
                    <img
                        src={icon}
                        alt={title}
                      
                        height={30}
                        width={30}
                    />
                        
                

           </div>
        </button>
    )
}

export default SideBarButton