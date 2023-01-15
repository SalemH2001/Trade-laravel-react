import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import React from "react";

export default function CreateTrade() {
    const [deal, setDeal] = useState('');
    const [login, setLogin] = useState('');
    const [action, setAction] = useState('');
    const [entry, setEntry] = useState('');
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [profit, setProfit] = useState('');
    const [volume, setVolume] = useState('');
    const [createMessage, setCreateMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [deal, login, action, entry, symbol, price, profit, volume]);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            let error = false;
            if (!deal) {
                setCreateMessage("Deal is required");
                error = true;
            }
            if (!login) {
                setCreateMessage("Login is required");
                error = true;
            }
            if (!action) {
                setCreateMessage("Action is required");
                error = true;
            }
            if (!entry) {
                setCreateMessage("Entry is required");
                error = true;
            }
            if (!symbol) {
                setCreateMessage("Symbol is required");
                error = true;
            }
            if (!price) {
                setCreateMessage("Price is required");
                error = true;
            }
            if (!profit) {
                setCreateMessage("Profit is required");
                error = true;
            }
            if (!volume) {
                setCreateMessage("Volume is required");
                error = true;
            }
            if (!error) {
                axios
                    .post('http://localhost:8000/api/trades/create', {
                        deal,
                        login,
                        action,
                        entry,
                        symbol,
                        price,
                        profit,
                        volume
                    })
                    .then(function (response) {
                        //handle success
                        alert('New Contact Successfully Added.');
                    })
                    .catch(function (error) {
                        //handle error
                        alert(error.response.data.message);
                    });
            }
            setError(error);
        },
        [deal, login, action, entry, symbol, price, profit, volume]
    );
    return (
        <div className="container">
            <div className="col-lg-4 col-md-offset-4">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-user"></span>
                        Add New Trade
                    </div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit}>
                            <label>Deal</label>
                            <input
                                type="text"
                                name="deal"
                                className="form-control"
                                onChange={(e) => setDeal(e.target.value)}
                            />
                            <label>Login</label>
                            <input
                                type="text"
                                name="login"
                                className="form-control"
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <label>Action</label>
                            <input
                                type="text"
                                name="action"
                                className="form-control"
                                onChange={(e) => setAction(e.target.value)}
                            />
                            <label>Entry</label>
                            <input
                                type="text"
                                name="entry"
                                className="form-control"
                                onChange={(e) => setEntry(e.target.value)}
                            />
                            <label>Symbol</label>
                            <input
                                type="text"
                                name="symbol"
                                className="form-control"
                                onChange={(e) => setSymbol(e.target.value)}
                            />
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <label>Profit</label>
                            <input
                                type="text"
                                name="profit"
                                className="form-control"
                                onChange={(e) => setProfit(e.target.value)}
                            />
                            <label>Volume</label>
                            <input
                                type="text"
                                name="volume"
                                className="form-control"
                                onChange={(e) => setVolume(e.target.value)}
                            />
                            {error && <p>{createMessage}</p>}
                            <br />
                            <input
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Create Trade"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}


