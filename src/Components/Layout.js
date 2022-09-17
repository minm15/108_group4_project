import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
 return (
   <>
     <Header />
     <div className="main">
       {props.children}
     </div>
     <Footer />
   </>
 )
}

export default Layout