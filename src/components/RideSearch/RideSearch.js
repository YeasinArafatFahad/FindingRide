
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
        console.log('gjksd')
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