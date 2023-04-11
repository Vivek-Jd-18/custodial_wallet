import React from 'react'
import { CreateWallet } from './CreateWallet'
import { Details } from './Details'
import { LoginReg } from './authComponents/LoginReg'

export const Main = ({ changeFun }: any) => {

    const logOutHandler = () => {
        changeFun("")
    }

    return (
        <>
            <div style={{ marginTop: "50px" }}>
                <Details />
            </div>
        </>
    )
}
