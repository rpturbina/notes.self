import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NoMatchPage = () => {
    return (
        <section className="not-found">
            <Helmet>
                <title>404 Not Found</title>
            </Helmet>
            <h2 className="not-found__code">404</h2>
            <p className="not-found__text">Halaman tidak ditemukan</p>
            <Link to="/">Kembali ke halaman utama</Link>
        </section>
    );
};

export default NoMatchPage;
