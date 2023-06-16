import React from 'react'; 
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div class="flex h-screen w-screen items-center bg-gray-50">
            <div class="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
                <div class="mx-8 w-full lg:w-1/2">
                    <div class="font-dark mb-8 text-7xl font-extrabold text-green-500">404</div>
                    <p class="mb-8 text-2xl font-light leading-normal md:text-3xl">
                        Sorry we couldn't find the page you're looking for
                    </p>

                    <Link
                        to="/"
                        className='bg-transparent w-full text-black border-2 hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-700 px-10 py-2 text-lg leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-200 mt-3'
                        >back to homepage</ Link
                    >
                </div>
                <div class="mx-5 my-12 w-full lg:flex lg:w-1/2 lg:justify-end">
                    <img
                        src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                        class=""
                        alt="Page not found"
                    />
                </div>
            </div>
        </div>
    )
};

export default NotFound;