import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import {UserContext} from '../../App'
import './Ride.css'
const Ride = (props) => {
    const { img } = props.ride
     const { setData } = useContext(UserContext)

     const rideCLick = () => {
         setData(props.ride)
         console.log('click')
     }
    return (
        <div >
            <div className='col-md-4 mb-2'>
                <div className="card card shadow p-3 mb-5 bg-light rounded " style={{ width: '200px', height: '200px' }}>
                <Link to={`search-ride`} onClick={rideCLick}>
                <div className="card-body">
                        <img style={{ width: '100%', height: '100%' }} class="card-img-top" src={img} alt="Card image cap"></img>
                    </div>
                </Link>
                    
                </div>
            </div>

        </div>

    );
};

export default Ride;