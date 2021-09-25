// import React from 'react';
// import styles from './Header.module.css';

// const Header = () => (
//     <h1 className={styles.heading}>
//         <span className ={ styles.light}>Weather</span> Forecast
//     </h1>
// );


import React, { Fragment } from 'react';

import Header from '../Header';

const Page = () => {
    return (
        <Fragment>
            <Header />
        </Fragment>
    );
};

export default Page;