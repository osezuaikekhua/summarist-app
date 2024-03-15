import React, { useContext } from 'react'
import { Context } from '../App'

import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineShop } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function Payment() {

  const { accountInformation } = useContext(Context)
  const { loginState } = useContext(Context)
  const { setSubscriptionStatus } = useContext(Context)
  const { subscriptionType } = useContext(Context)
  

  const location = useNavigate()

  const subscribeToPremium = () => {
    alert("This is a fake transaction. Enjoy your premium subscription")
    setSubscriptionStatus("Premium")
  }

  const exitPurchasePage = () => {
    location('/for-you')
  }
  
  return (
    <>
    <div className='Purchase__Page'>
      <div className="row">
        <div className="Purchase__Page__section-1">

          <div className="Purchase__Page__LeftSide">
            <div className='Purchase__Page__Exit' onClick={exitPurchasePage}>
              <i><IoIosArrowRoundBack /></i>
              <span><AiOutlineShop /></span>
              <h2>Summarist</h2>
            </div>

            <div className='Purchase__Page__Premium'>
              <div>
                <h1>Subscribe to Summarist Premium</h1>
              </div>
              <div style={{display: "flex", alignItems: "center"}}>
                <div> 
                  {subscriptionType==="MTM" ? <h2>$9.99</h2> : <h2>$99.99</h2>}
                </div>
                <div> 
                  <h4>per</h4>
                  {subscriptionType==="MTM" ? <h4>month</h4> : <h4>yearly</h4>}
                </div>
              </div>
            </div>

          </div>
          
          <div className="Purchase__Page__CardInfo">

            <div className='Purchase__Page__Other'>
              <div className='Purchase__Page__Google'>
                <i><FcGoogle/></i> 
                <h2>Pay</h2>
              </div>

              <div className='Purchase__Page__Link'>
                <h2>Pay with <span>Link</span></h2>
              </div>
            </div>

            <div className="Purchase__Page__Border">
              <div id='Purchase__Page--Or'>
                <div></div>
                <h5>Or pay with card</h5>
                <div></div>
              </div>
            </div>
            
            
            <div >

              <div className='Purchase__Page__Email'>
                <h2>Email</h2>
                <h2>{loginState ? accountInformation : '🚫unable to provide email' }</h2>
              </div>

              <h1>Card information</h1>

              <section>
                <input type="text" placeholder='1234 1234 1234 1234' required
                  style={{
                    borderRight: "1px solid #8080807a", 
                    borderTop: "1px solid #8080807a",
                    borderLeft: "1px solid #8080807a",
                    borderBottom: "none",
                    borderRadius: "5px 5px 0 0"
                  }}
                />
                <div className="card__information"> 
                  <input type="text" placeholder='MM/YY' required
                    style={{
                      borderRight: "1px solid #8080807a", 
                      borderTop: "1px solid #8080807a",
                      borderLeft: "1px solid #8080807a",
                      borderBottom: "1px solid #8080807a",
                      borderRadius: "0 0 0 5px"
                    }}
                  />
                  <input type="text" placeholder='CVC' required
                    style={{
                      borderRight: "1px solid #8080807a", 
                      borderTop: "1px solid #8080807a",
                      borderLeft: "none",
                      borderBottom: "1px solid #8080807a",
                      borderRadius: "0 0 5px 0"
                    }}
                  />
                </div>
              </section>

              <h1>Carholder</h1>

              <section>
                <div className="cardholder__name">
                  <input type="text" placeholder='Full name on card' required
                    style={{
                      borderRight: "1px solid #8080807a", 
                      borderTop: "1px solid #8080807a",
                      borderLeft: "1px solid #8080807a",
                      borderBottom: "1px solid #8080807a",
                      borderRadius: "5px"
                    }}
                  />
                </div>
              </section>

              <h1>Billing address</h1>

              <section>
                <div className="billing__addres" >
                  <input type="text" placeholder="United States" required
                    style={{
                      borderRight: "1px solid #8080807a", 
                      borderTop: "1px solid #8080807a",
                      borderLeft: "1px solid #8080807a",
                      borderBottom: "1px solid #8080807a",
                      borderRadius: "5px 5px 0 0"
                    }}
                  />
                  <input type="text" placeholder='Address'required
                    style={{
                      borderRight: "1px solid #8080807a", 
                      borderTop: "none",
                      borderLeft: "1px solid #8080807a",
                      borderBottom: "1px solid #8080807a",
                      borderRadius: "0 0 5px 5px"
                    }}
                  />
                </div>
              </section>

              <button className='btn' onClick={subscribeToPremium}> Subscribe </button>
              
              <div className='Purchase__Page__Footer'>
                <h2> Enter in <span> FAKE </span> information </h2>
                <h2> This is a demo so no information is being stored. </h2>
              </div>
              
            </div> 
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Payment