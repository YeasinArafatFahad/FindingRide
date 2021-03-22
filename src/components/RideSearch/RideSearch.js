
import React, { useState, useContext } from 'react';
import { UserContext } from '../../App'
import GoogleMap from '../Map/Map'
const RideSearch = () => {
    const { data } = useContext(UserContext)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const handleChange = (event) => {
        const value = event.target.value
        event.target.name == 'from' ? setFrom(value) : setTo(value)
    }
    const searchClick = () => {
        setIsSearch(true);
        console.log(data)

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <div className="card border-info mb-3">
                        <div className="card-header">
                            {isSearch ? (
                                <div>
                                    <div className="mb-3">
                                        <div className="bg-primary rounded">
                                            <h3>{from}</h3>
                                            <h3>{to}</h3>
                                        </div>
                                    </div>
                                    <div classname="mb-1">
                                        <div class="d-flex justify-content-around align-items-center border border-primary border-1 rounded p-3">
                                            <img style={{ width: '15%', height: '15%' }} class="card-img-top" src={data.img} alt="Card image cap"></img>
                                            <h4>{data.seat}</h4>
                                            <h4>${data.price}</h4>
                                        </div>
                                    </div>
                                    <div classname="mb-1">
                                        <div class="d-flex justify-content-around align-items-center border border-primary border-1 rounded p-3">
                                            <img style={{ width: '15%', height: '15%' }} class="card-img-top" src={data.img} alt="Card image cap"></img>
                                            <h4>{data.seat}</h4>
                                            <h4>${data.price}</h4>
                                        </div>
                                    </div>
                                    <div classname="mb-1">
                                        <div class="d-flex justify-content-around align-items-center border border-primary border-1 rounded p-3">
                                            <img style={{ width: '15%', height: '15%' }} class="card-img-top" src={data.img} alt="Card image cap"></img>
                                            <h4>{data.seat}</h4>
                                            <h4>${data.price}</h4>
                                        </div>
                                    </div>

                                </div>

                            ) : (
                                <div>
                                    <div className="mb-3">
                                        <input type="text" name="from" onChange={handleChange} className="form-control" placeholder="From..." />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="to" onChange={handleChange} className="form-control" placeholder="To..." />
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={searchClick} className="btn btn-primary mx-auto">Search</button>
                                    </div>
                                </div>

                            )}

                        </div>
                    </div>
                </div>
                <div className="col-md-7 offset-md-1 col-sm-12">
                    <GoogleMap />
                </div>
            </div>
        </div>


    )
}

export default RideSearch;