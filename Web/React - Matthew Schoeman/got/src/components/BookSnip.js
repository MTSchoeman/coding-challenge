import React from "react";

function BookSnip({book}){
    return(
        <>
            <p><b>{book.name}</b> by {book.authors.join(', ')}</p>
        </>
    );
}
export default BookSnip;