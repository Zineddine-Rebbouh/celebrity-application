import React from 'react'

const father = () => {
    const logout = () => {
        localStorage.removeItem( 'logindata' )
    }
    return (
        <div>
            <button onClick={ logout }>logout</button>
        </div>
    )
}

export default father
