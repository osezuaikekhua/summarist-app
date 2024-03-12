import React, { useState } from 'react'
import Footer from '../componets/home/Footer'
import { GiNotebook } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import pricing from "../images/pricing-top.png"




function ChoosePlan() {

  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected == i){
      return setSelected(null)
    }

    setSelected(i)
  }


  const upgradeToPremium = async () => {
    console.log("upgrade to premium")
  }
  
  return (
    <>
      <div className="Plan__Container">
        <section className='Plan__Container__Landing'>
          <div className="row">
            <div className='Plan__Container__Landing--container'>
              <div className='Plan__Container__Landing--title'>
                <h1>Get unlimited access to many amazing books to read</h1>
              </div>
              
              <h5>Turn ordinary moments into amazing learning opportunities</h5>
              <img src={pricing} alt="" />
            </div>
          </div>
        </section>

        <div className="row">

          <section className='Plan__Container__Options'>
              <div>
                <i><GiNotebook /></i>
                <h4> <span>Key ideas in few min</span>  with many books to read</h4>
              </div>

              <div>
                <i><RiPlantFill /></i>
                <h4> <span>3 million</span>  people growing with Summarist everyday</h4>
              </div>

              <div>
                <i><FaHandshake /></i>
                <h4> <span> Precise recommendations</span> collections curated by experts</h4>
              </div>
          </section>

          <section>
            <div className='btn' onClick={upgradeToPremium}> Buy Premium </div>
          </section>

          <section className='Plan__Container__Questions'>
            {
              question.map( (item, i) => (
                <div className='Plan__Container__Questions--item' onClick={() => toggle(i)}>
                  <div className='Plan__Container__Questions--title' >
                    <h2>{item.question}</h2>
                    <i>{selected == i ? <SlArrowUp /> : <SlArrowDown />}</i>
                  </div>
                  <h3 className={selected == i ? 'Plan__Container__Questions--content show' : 'Plan__Container__Questions--content'}>{item.answer}</h3>
                </div>
              ))
            }
          </section>

        </div>
      </div>
      <Footer/>
    </>
  )
}

  const question = [
    {
      question: " How does the free 7-day trial work? ",
      answer: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial. "
    },
    {
      question: " Can I switch subscriptions from monthly to yearly, or yearly to monthly? ",
      answer: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
    },
    {
      question: " What's included in the Premium plan? ",
      answer: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
    },
    {
      question: " Can I cancel during my trial or subscription? ",
      answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
    },
  ]

export default ChoosePlan