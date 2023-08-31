import React from "react";

function HouseSnip({house}){
    return(
        <>
            <p> {house?.name} - {house?.region} </p>
        </>
    );
}
export default HouseSnip;