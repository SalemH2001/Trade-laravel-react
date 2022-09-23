import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import Pagination from "react-js-pagination";

export default function ListUser() {

    const [trades, setTrade] = useState([]);
    const [Paginate, setPaginate] = useState([]);
    const [pageNumber, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const params = new URLSearchParams(location.search)


    useEffect(() => {
        getTrade();
    }, []);


    function getTrade() {

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

        if (params.get('search') != null) {
            setTrade([]);
            setLoading(true);
            axios.get('http://localhost:8000/api/trade?search=' + params.get("search") + '&page=' + pageNumber).then(function (response) {
                setPaginate(response.data);
                setTrade(response.data.data);
                setLoading(false);
            })
                .catch(function (error) {
                    //handle error
                    alert(error.response.data.message);
                });
        }

    }

    class App extends React.Component {
        state = {
            search: '',
        }
        handleFormSubmit(event) {
            event.preventDefault();

            let formData = new FormData();
            formData.append('search', this.state.search)
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
            {loading ?
                (<div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>) : (<div className="container">
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
                    </table>
                </div>
                )}
            <div>
                <Pagination
                    activePage={Paginate?.current_page ? Paginate?.current_page : 0}
                    itemsCountPerPage={Paginate?.per_page ? Paginate?.per_page : 0}
                    totalItemsCount={Paginate?.total ? Paginate?.total : 0}
                    onChange={(pageNumber) => {
                        setPage(pageNumber)
                        getTrade(pageNumber)
                    }}
                    pageRangeDisplayed={10}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
        </div>
    )
}