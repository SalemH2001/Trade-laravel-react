import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import TradeTable from './TradeTable';
import SearchForm from './SearchForm';

export default function ShowTrade() {
    const [trades, setTrades] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1 });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const page = params.get('page') || 1;
    const loadData = useCallback(async (pageNumber, searchTerm) => {
        setLoading(true);
        setError('');
        try {
            let response;
            if (searchTerm) {
                response = await axios.get(`http://localhost:8000/api/trade?search=${searchTerm}&page=${pageNumber}`);
            } else {
                response = await axios.get(`http://localhost:8000/api/trade?page=${pageNumber}`);
            }
            if (response.status === 200) {
                setTrades(response.data.data);
                setPagination(response.data.pagination);
            } else {
                setError(response.data.message);
                setTrades([]);
                setPagination({});
            }
        } catch (error) {
            console.log(error);
            setError(`Error occured while loading data: ${error}`);
            setTrades([]);
            setPagination({});
        }
        setLoading(false);
    }, []);

    const handlePageChange = useCallback((pageNumber) => {
        navigate(`/?search=${searchTerm}&page=${pageNumber}`);
        loadData(pageNumber, searchTerm);
    }, [navigate, loadData, searchTerm]);

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            setError("Search term can't be empty.");
            return;
        }
        navigate(`/?search=${searchTerm}`);
        loadData(1, searchTerm);
    }, [navigate, loadData, searchTerm]);


    useEffect(() => {
        loadData(page, searchTerm);
    }, [loadData, page, searchTerm]);

    return (
        <div className="container-fluid">
            <div className="row">
                <SearchForm handleFormSubmit={handleFormSubmit} setSearchTerm={setSearchTerm} setError={setError} searchTerm={searchTerm} />
            </div>
            <div className="row">
                <div className="col-sm-12">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <>
                            {trades.length > 0 && <TradeTable trades={trades} searching={!!searchTerm} />}
                            <Pagination
                                activePage={pagination.current_page}
                                itemsCountPerPage={pagination.per_page}
                                totalItemsCount={pagination.total}
                                onChange={(pageNumber) => handlePageChange(pageNumber)}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}