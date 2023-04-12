import React, { useState } from 'react'
import { Transactions } from './Transactions'
import { Tokens } from './Tokens';

export const Footer1 = () => {

    const [tabToggle1, setTabToggle1] = useState<boolean>(false);

    const tabSwitchHandler = (flag: boolean) => {
        setTabToggle1(flag);
    }

    return (
        <>
            <div className='container bg-dark'>
                <div className="card mb-3" style={{ width: "auto" }}>
                    <div className="card-body bg-dark">
                        <div className='d-flex flex-col m-auto justify-content-evenly m-3'>
                            <div className='m-2'>
                                <a className="card-title " style={{ textDecoration: "none", cursor: "pointer" }}
                                    onClick={() => tabSwitchHandler(false)}>Assets</a>
                            </div>
                            <div style={{ borderLeft: "solid #000000", marginBottom: "12px" }}></div>
                            <div className='m-2'>
                                <a className="card-title" style={{ textDecoration: "none", cursor: "pointer" }}
                                    onClick={() => tabSwitchHandler(true)}>Activity</a>
                            </div>
                        </div>
                        <div>
                            {tabToggle1 ? <Transactions /> :
                                <Tokens />
                            }

                        </div>
                        <a href="#" className="card-link" >Import Tokens</a>
                        <a href="#" className="card-link">Need Help?</a>
                    </div>
                </div>
            </div>
        </>
    )
}
