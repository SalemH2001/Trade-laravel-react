import React from 'react';

function TradeTable({trades}) {
    return (
        <table className="table table-striped">
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
                {trades.map(trade => (
                    <tr key={trade.Deal}>
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
    );
}

export default TradeTable
