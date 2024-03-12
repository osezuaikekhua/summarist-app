import React, { useEffect } from 'react'


function FontSize({changeFontSize16, changeFontSize21, changeFontSize26, changeFontSize30}) {
    const Tabs =  () => {
        const links = document.querySelectorAll(".Font_Option")
        
        links.forEach( tab =>{
          tab.addEventListener('click', () => {
            document.querySelector('.font_active')?.classList.remove('font_active')
            tab.classList.add('font_active')
          })
        })
    }

    useEffect(() => {
        Tabs()
    })

  return (
    <header className='Font_Selection'>
        <div className='Font_Option font_active' style={{fontSize : '16px'}} onClick={changeFontSize16}>Aa</div>
        <div className='Font_Option' style={{fontSize : '21px'}} onClick={changeFontSize21}>Aa</div>
        <div className='Font_Option' style={{fontSize : '26px'}} onClick={changeFontSize26}>Aa</div>
        <div className='Font_Option' style={{fontSize : '30px'}} onClick={changeFontSize30}>Aa</div>
    </header>
    
  )
}

export default FontSize