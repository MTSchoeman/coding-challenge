import React from "react";

function BookListCard({ book }) {

    return (
        <div className="bookList card">
            <div className="bookList card-header text-center">
                <h4 className="bookList card-title">{book.name}</h4>
            </div>
            <div className="bookList card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Title: </h4>
                        <h6>{book.name ? book.name : 'Unknown'}</h6>
                    </div>
                    <div className="col-md-6">

                        <h4>ISBN: </h4>
                        <h6> {book.isbn ? book.isbn : 'Unknown'}</h6>
                    </div>
                    <hr />
                    <div className="col-12">

                        <h4>Author: </h4>
                        <h6>{book.authors[0] ? book.authors.join(', ') : 'Unknown'}</h6>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className='col-auto'>
                                <h5>Released: </h5>
                            </div>
                            <div  className='col-auto'>
                                <h6>{book.released ? new Date(book.released).toDateString() : 'Unknown'}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookListCard;