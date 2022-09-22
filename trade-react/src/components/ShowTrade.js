import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";

export default function ListUser() {

    const [trades, setTrade] = useState([]);
    useEffect(() => {
        getTrade();
    }, []);
    const[loading,setLoading]= useState(true);
    
    const location=useLocation()
    const params = new URLSearchParams(location.search)

    function getTrade() {
        
        if(params.get('deal') != null && params.get('login') != null){
            axios.get('http://localhost:8000/api/trades?deal='+params.get("deal")+'&login='+params.get("login")).then(function(response) {
                console.log(response.data);
                setTrade(response.data);
                setLoading(false);
            })
            .catch(function (response) {
                //handle error
                alert('No Posts');
            });
        }
        if(params.get('deal') != null && params.get('login') == null){
            axios.get('http://localhost:8000/api/trades?deal='+params.get("deal")).then(function(response) {
                console.log(response.data);
                setTrade(response.data);
            })
            .catch(function (response) {
                //handle error
                alert('No Posts');
            });
        }

        if(params.get('deal') == null && params.get('login') != null){
            axios.get('http://localhost:8000/api/trades?login='+params.get("login")).then(function(response) {
                console.log(response.data);
                setTrade(response.data);
            })
            .catch(function (response) {
                //handle error
                alert('No Posts');
            });
        }
        
    }
    class App extends React.Component {
        state = {
          deal: '',
          login: '',
        }
        handleFormSubmit( event ) {
            event.preventDefault();
      
            let formData = new FormData();
            formData.append('deal', this.state.deal)
            formData.append('login', this.state.login)      
        }
    }
    


    return (
        <div className="col-md-8 col-md-offset-2"> 
        <form>
            <div className="form-group">
            <label>Deal</label>
            <input type="text" name="deal" className="form-control" />
            <label>Login</label>
            <input type="text" name="login"className="form-control" />
            <br/>
            <input type="submit" className="btn btn-primary btn-block" onClick={e => this.handleFormSubmit(e)} value="Search for Trade" />    
            </div>
        </form>
        {loading ? 
        (<div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div> ): (<div className="container">
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
        {Object.values(trades).map((trade,index)  =>(
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
         </div>
    )
}