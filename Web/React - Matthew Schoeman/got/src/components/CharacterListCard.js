import React from "react";

function CharacterListCard({ character }) {

    return (

        <div className="characterList card">
            <div className="characterList card-header text-center">
                <h4 className="characterList card-title">{character.name ? character.name : 'Nameless'}</h4>
            </div>
            <div className="characterList card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Gender:</h4>
                        <h6>{character.gender ? character.gender : 'Gender not specified'}</h6>
                    </div>
                    <div className="col-md-6">
                        <h4>Culture:</h4>
                        <h6>{character.culture ? character.culture : 'Culture not specified'}</h6>
                    </div>
                    <hr />
                    <div className="col-xs-12">
                        <h4>Born:</h4>
                        <h6>{character.born ? character.born : 'Date not specified'}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterListCard;