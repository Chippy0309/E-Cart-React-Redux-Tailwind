import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#3b82f6', color: 'white' }} className="p-4">
            <div className="container mx-auto flex justify-between flex-wrap">
                <div className="w-1/4">
                    <h5 className="text-xl font-bold">E Cart</h5>
                    <p>Designed and built with all the love in the world by the Luminar team with the help of our contributors.</p>
                    <p>Code licensed Luminar, docs CC BY 3.0.</p>
                    <p>Currently v5.3.2.</p>
                </div>

                <div className="w-1/4">
                    <h5 className="text-xl font-bold">Links</h5>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Landing Page</Link><br />
                    <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Home Page</Link><br />
                    <Link to='/history' style={{ textDecoration: 'none', color: 'white' }}>History Page</Link>
                </div>

                <div className="w-1/4">
                    <h5 className="text-xl font-bold">Guides</h5>
                    <Link to='/react' style={{ textDecoration: 'none', color: 'white' }}>React</Link><br />
                    <Link to='/bootstrap' style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</Link><br />
                    <Link to='/router' style={{ textDecoration: 'none', color: 'white' }}>React Router</Link>
                </div>

                <div className="w-1/4">
                    <h5 className="text-xl font-bold">Contact Us</h5>
                    <input type="text" placeholder="Enter Your Email Here.." className="rounded p-1 mb-2" />
                    <button className="btn btn-ms-2">
                        <i className="fas fa-solid fa-arrow-right"></i>
                    </button>
                    <div className="icons flex justify-between mt-3">
                        <a href="https://en.wikipedia.org/wiki/Twitter" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.linkedin.com/feed/" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/" target="_blank" style={{ textDecoration: 'none', color: 'white' }}>
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            <p className="text-center mt-3">Copyright &copy; May 2025 Batch, E-cart. Built with React/Redux.</p>
        </div>
    );
}

export default Footer;