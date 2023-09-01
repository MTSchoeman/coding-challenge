import React from "react";

function CharacterSnip({character}){
    return(
        <>
            {character ? (
                <div>
                    <p>{character.name === '' ? 'Nameless' : character.name } : {character.gender ? character.gender : 'Unknown gender'} -  {character.culture ? character.culture : 'Unknown culture' }</p>
                </div>    
            ): (
                <p>Unknown</p>
            )}

        </>
    );
}
export default CharacterSnip;