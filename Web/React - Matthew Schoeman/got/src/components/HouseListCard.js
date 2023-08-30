import React from "react";

function HouseListCard({ house }) {
    return (

        <div className="houseList card">
            <div className="houseList card-header text-center">
                <h4 className="houseList card-title">{house.name}</h4>
            </div>
            <div className="houseList card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Region: </h4>
                        <h6>{house.region ? house.region : 'Unknown'}</h6>
                    </div>
                    <div className="col-md-6">
                        <h4>Words: </h4>
                        <h6>{house.words ? house.words : 'Unknown'}</h6>
                    </div>
                    <hr />
                    <div className="col-xs-12">

                        <h4>Coat of Arms: </h4>
                        <h6> {house.coatOfArms ? house.coatOfArms : 'Unknown'}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HouseListCard;