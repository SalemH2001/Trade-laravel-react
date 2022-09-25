import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import React from "react";
import Pagination from "react-js-pagination";

export default function ListUser() {

    const [trades, setTrade] = useState([]);
    const [Strades, setSTrade] = useState([]);
    const [Paginate, setPaginate] = useState([]);
    const [SPaginate, setSPaginate] = useState([]);
    const [search] = useState('');
    const [searching,setSearching]=useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    
    useEffect(() => {
        getTrade();
    }, []);

    useEffect(() => {
        handleFormSubmit();
    }, []);

    function getTrade(pageNumber) {
       
        setLoading(true);
        axios.get("http://localhost:8000/api/trades?page=" + pageNumber).then(function (response) {
            setPaginate(response.data);
            setTrade(response.data.data);
            setLoading(false);
        })
            .catch(function (error) {
                //handle error
                alert(error.response.data.message);
            });
    }

    function handleFormSubmit(pageNumber){
        let formData = new FormData();
        formData.append('search', search);
        if (params.get('search') != null) {
            setSearching(true);
            setLoading(true);
            axios.get('http://localhost:8000/api/trade?search=' + params.get("search") + '&page=' + pageNumber).then(function (response) {
                setSPaginate(response.data);
                setSTrade(response.data.data);
                setLoading(false);
            })
                .catch(function (error) {
                    //handle error
                    alert(error.response.data.message);
                });
        }
    }



    return (
        <div className="col-md-8 col-md-offset-2">
            <form>
                <div className="form-group">
                    <label>Search</label>
                    <input type="text" name="search" className="form-control" />

                    <br />
                    <input type="submit" className="btn btn-primary btn-block" onClick={e => this.handleFormSubmit(e)} value="Search for Trade" />
                </div>
            </form>
            {loading?
                (<div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>) : (<div className="table-responsive">
                    <h3>Trade Table</h3>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Deal</th>
                                <th>Login</th>
                                <th>Action</th>
                                <th>Entry</th>
                                <th>Time</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>Profit</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        {!searching? 
                (  
                    <tbody>
                    {Object.values(trades).map((trade, index) => (
                        <tr key={index}>
                            <td>{trade.Deal}</td>
                            <td>{trade.Login}</td>
                            <td>{trade.Action}</td>
                            <td>{trade.Entry}</td>
                            <td>{trade.Time}</td>
                            <td>{trade.Symbol}</td>
                            <td>{trade.Price}</td>
                            <td>{trade.Profit}</td>
                            <td>{trade.Volume}</td>

                        </tr>

                    ))}
                </tbody>
                ) : (
                        <tbody>
                            {Object.values(Strades).map((trade, index) => (
                                <tr key={index}>
                                    <td>{trade.Deal}</td>
                                    <td>{trade.Login}</td>
                                    <td>{trade.Action}</td>
                                    <td>{trade.Entry}</td>
                                    <td>{trade.Time}</td>
                                    <td>{trade.Symbol}</td>
                                    <td>{trade.Price}</td>
                                    <td>{trade.Profit}</td>
                                    <td>{trade.Volume}</td>

                                </tr>

                            ))}
                        </tbody>
                )}
                    </table>
                </div>
                )}

                {!searching? 
                (<div 
                >
                <Pagination
                    activePage={Paginate?.current_page ? Paginate?.current_page : 0}
                    itemsCountPerPage={Paginate?.per_page ? Paginate?.per_page : 0}
                    totalItemsCount={Paginate?.total ? Paginate?.total : 0}
                    onChange={(pageNumber) => {
                        getTrade(pageNumber)
                    }}
                    getPageUrl={(i)=>`?page=${i}`}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>) : (<div >
                <Pagination
                    activePage={SPaginate?.current_page ? SPaginate?.current_page : 0}
                    itemsCountPerPage={SPaginate?.per_page ? SPaginate?.per_page : 0}
                    totalItemsCount={SPaginate?.total ? SPaginate?.total : 0}
                    onChange={(pageNumber) => {
                        handleFormSubmit(pageNumber)
                    }}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>)}
        </div>
    )
}