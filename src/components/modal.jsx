import React from 'react';

import styled from "styled-components";

const Modal = () => {
    return(

        <OverLay>
            <ModalOverlay>
                    <div>modallll</div>
            </ModalOverlay>
            
        </OverLay>
    )
}

export default Modal;

const OverLay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalOverlay = styled.div`
    width: 600px;
    height: 100px;
    background: white;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 30px 0px;
    padding: 20px;
`

