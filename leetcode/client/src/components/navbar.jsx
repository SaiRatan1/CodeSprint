import { useEffect, useState } from 'react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
    const location = useLocation();
    const [display,setDisplay] = useState(false);
    useEffect(()=>{

        if(location.pathname!=='/login' &&  location.pathname!=='/signup'){
            setDisplay(true);
        }
    },[])
    return (
        <div className="flex justify-center bg-neutral-800 text-gray-200">
            <div className='flex justify-between text-lg py-2 w-9/12 text-center'>
                <div className="left ">
                    <Link to={'/'}>
                        FreeCode
                    </Link>
                </div>
                {display && 
                <div className="pr-4">
                    <Link to={'/login'}>
                        <div className="signup ">Sign in</div>
                    </Link>
                </div>
                }
            </div>
        </div>
    )
}

export default Navbar
