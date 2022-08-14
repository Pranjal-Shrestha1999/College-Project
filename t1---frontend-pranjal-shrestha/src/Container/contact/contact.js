import React from 'react'


const contact = () => {
  return (
    <><h1 className="about-page-title text-center font-weight-bold pt-5 pb-0">
    Contact Us
  </h1>
    
      <div >
      <p style={{textAlign:"left"}} >
      &nbsp;You can call us  &nbsp;<i class="fa fa-phone " aria-hidden="true"></i><br></br>
      &nbsp;Phone number: 9861001794 
       </p>
       
       <p style={{textAlign:"center", marginTop:"-60px"}}>
        You can E-mail us &nbsp; <i class="fa fa-envelope" aria-hidden="true"></i><br></br>
        G-mail Id: Ujwalshrestha1968@gmail.com
       </p>

       <p style={{textAlign:"right", marginRight:"119px", marginTop:"-70px" }}> 
       Some Others&nbsp; <i class="fa fa-info-circle " aria-hidden="true"></i><br></br>
       <a href="mailto: Ujwalshrestha1968@gmail.com" target="_blank" title="e-mail">
       <i class="fa fa-envelope fa-2x" aria-hidden="true">&nbsp;</i> Click here for direct e-mail
       </a>

       
                  
       </p>
       <p style={{textAlign:"right", marginRight:"100px", marginTop:"-50px" }}><br></br>
       <br></br>
       <a href="viber://chat?number=9851328161" target="_blank" title="phone-number">
       <i class="fab fa-viber fa-2x"  >&nbsp;</i> Click here for direct viber chat
       </a></p>
       
       </div>
      
    </>
  )
}

export default contact