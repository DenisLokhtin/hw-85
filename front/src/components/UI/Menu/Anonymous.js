import React from 'react';

const Anonymous = (props) => {
    return (
        <>
            <a href={'/login'} style={{marginRight: '15px'}}>Login</a>
            <a href={'/register'}>Register</a>
        </>
    );
};

export default Anonymous;