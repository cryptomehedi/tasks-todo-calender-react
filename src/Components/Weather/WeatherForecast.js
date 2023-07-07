import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const WeatherForecast = () => {

    const {data, isLoading, error, refetch} = useQuery('weather', ()=>axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WeatherAppId}&q=London`))

    console.log(data?.data);

    function success(pos) {
        const crd = pos.coords;
      
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }

      console.log(navigator.geolocation.getCurrentPosition(success))
    // getCurrentPosition(success));

    return (
        <div>
            <h1>Your Current location : {data?.data?.location?.name},{data?.data?.location?.country}</h1>
        </div>
    );
};

export default WeatherForecast;