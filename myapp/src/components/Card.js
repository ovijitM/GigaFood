import React from 'react'

export default function Card(props) {
let options = props.options;
let priceOptions = Object.keys(options);

    return (
        <div className="card" style={{ "width": "18rem" }}>
            <img src="https://img.freepik.com/free-vector/chain-link-elements-set_1284-45763.jpg?size=626&ext=jpg&ga=GA1.1.1914436210.1723966502&semt=ais_hybrid" className="card-img-top" alt="this is an dd" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description} </p>
                <div className='container'>
                    <select className="m-2 h-100 bg-success text-black rounded">
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className="m-2 h-100 bg-success text-black rounded">
                        {priceOptions.map((data) => {
                            return (
                                <option key={data} value={data}>{data}</option>
                            )  
                        })}
                    </select>
                    <div className='d-inline h-100 fs-5'>
                    total: 100</div>
                </div>
            </div>
        </div>
    )
}
