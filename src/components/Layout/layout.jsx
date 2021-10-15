import React from 'react';
import PropTypes from "prop-types"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'
import Nav from './Nav';
import Footer from './Footer';
import "./layout.css"

function Layout({ children }){

	return(
            <React.Fragment>
                <Nav />
                <main>{children}</main>
                <Footer />
            </React.Fragment>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
