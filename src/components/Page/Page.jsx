import React, { Fragment } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';

import useForecast from '../../hooks/useForecast';

import styles from './Page.module.css';

//import Map from '../Map/Map';

const Page = () => {
    const {isError, isLoading, forecast, coordinates, submitRequest} = useForecast();

    const onSubmit = (value) => {
        submitRequest(value);
    };

    return (
        <Fragment>
            <Header />
            
            {!forecast && (
            <div className={`${styles.box} position-relative`}>
                {!isLoading && <Form submitSearch={onSubmit}/>}

                {isError && <Error message={isError}/>}
                {isLoading && <Loader/>}
            </div>
            )}

            {forecast && (
            <div className={`${styles.box2} position-relative`}>
                <div className={`${styles.container} position-relative`}>
                    {forecast && <Form submitSearch={onSubmit}/>}
                </div>
                <div className={`${styles.container} position-relative`}>
                    {forecast && <Forecast forecast={forecast} coordinates={coordinates}/>}
                </div>
                {/* <div className={`${styles.container} position-relative`}>
                    {forecast && <Map coordinates={coordinates}/>}
                </div> */}
            </div>
            

            
             )}

            


             
            
            {/* {forecast && <Forecast forecast={forecast}/>} */}
        </Fragment>
    );

};

export default Page;




