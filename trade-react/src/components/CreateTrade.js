import { useState } from "react";
import axios from "axios";
import React from "react";


export default function CreateTrade(){

    const [inputs, setInputs] = useState([{
        deal:'0',
        login:'0',
        action:'0',
        entry:'0',
        symbol:'',
        price:'0',
        profit:'0'
    }]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let createMessage = "";

        axios.post('http://localhost:8000/api/trades/create', inputs).then(function(response){
           //handle success
          console.log(response)
          alert('New Contact Successfully Added.');  
      })
        .catch(function (response) {
            //handle error
            alert('wrong entry');
        });
        
        
    }
    return(

        <div className="container">
            <div className="col-lg-4 col-md-offset-4">
                <div className="panel panel-primary">
                    <div className="panel-heading"><span className="glyphicon glyphicon-user"></span> Add New Trade</div>
                    <div className="panel-body">
                    <form onSubmit={handleSubmit}>
                        <label>Deal</label>
                        <input type="text" name="deal" className="form-control" onChange={handleChange} />

                        <label>Login</label>
                        <input type="text" name="login"className="form-control"  onChange={handleChange} />
                        
                        <label>Action</label>
                        <input type="text" name="action" className="form-control" onChange={handleChange} />

                        <label>Entry</label>
                        <input type="text" name="entry" className="form-control" onChange={handleChange} />
                        
                        <label>Symbol</label>
                        <input type="text" name="symbol" className="form-control" onChange={handleChange} />

                        <label>Price</label>
                        <input type="text" name="price" className="form-control" onChange={handleChange} />
                        
                        <label>Profit</label>
                        <input type="text" name="profit" className="form-control" onChange={handleChange} />

                        <label>Volume</label>
                        <input type="text" name="volume" className="form-control" onChange={handleChange} />

                        <br/>
                        <input type="submit" className="btn btn-primary btn-block" value="Crearte Trade" />
                    </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
