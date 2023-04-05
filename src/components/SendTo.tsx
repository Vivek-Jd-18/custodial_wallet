import React from 'react'

export const SendTo = () => {
    return (
        <div>
            <input className='form-control' type='text' placeholder='Search, public address (0x), or ENS' />
            <hr />
            <div className='py-3' style={{ backgroundColor: "grey", borderRadius: "10px" }}><a className='ms-4' style={{ textDecoration: "none", fontSize: "15px" }}>Transfer Between My Accounts</a></div>
            <hr />
            <div>
                <span className='ms-1' style={{ fontSize: "14px" }}>Recents</span>
                <ul className="list-group mt-3">
                    <div className='d-flex flex-column list-group-item'>
                        <p>0 SepoliaETH</p>
                        <p>0.00 Rs.</p>
                    </div>
                    <div className='d-flex flex-column list-group-item'>
                        <p>0 SepoliaETH</p>
                        <p>0.00 Rs.</p>
                    </div>
                    <div className='d-flex flex-column list-group-item'>
                        <p>0 SepoliaETH</p>
                        <p>0.00 Rs.</p>
                    </div>
                </ul>
            </div>
        </div>
    )
}
