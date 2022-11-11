import React from 'react';
import About from '../Shared/About/About';
import Banner from '../Shared/Banner/Banner';
import Services from '../Shared/Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;