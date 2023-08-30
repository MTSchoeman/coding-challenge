import React from "react";
import { PageService } from "../services/PageService";
import { useCharacterContext } from "../context/CharacterContext";
import { useHouseContext } from "../context/HouseContext";
import { useBookContext } from "../context/BookContext";
import '../styles/Pagination.css'
function Pagination({ componentName }) {

    const { fetchCharacters } = useCharacterContext();
    const { fetchHouses } = useHouseContext();
    const { fetchBooks } = useBookContext();

    const [pageSize, setPageSize] = React.useState("");

    const FetchData = () => {
        PageService.UpdateData(fetchBooks, fetchCharacters, fetchHouses, pageSize)
    }

    const GetCurrentPage = () => {
        switch (componentName) {
            case 'character': return PageService.characterCurrentPage;
            case 'house': return PageService.houseCurrentPage;
            case 'book': return PageService.bookCurrentPage;
            default: return;
        }
    }

    const GetLastPage = () => {
        switch (componentName) {
            case 'character': return PageService.characterLastPage;
            case 'house': return PageService.houseLastPage;
            case 'book': return PageService.bookLastPage;
            default: return;
        }
    }

    const ShowFirst = () => {
        switch (componentName) {
            case 'character': PageService.ShowFirst(componentName, fetchCharacters); break;
            case 'house': PageService.ShowFirst(componentName, fetchHouses); break;
            case 'book': PageService.ShowFirst(componentName, fetchBooks); break;
            default: break;
        }
    }

    const ShowLast = () => {
        switch (componentName) {
            case 'character': PageService.ShowLast(componentName, fetchCharacters); break;
            case 'house': PageService.ShowLast(componentName, fetchHouses); break;
            case 'book': PageService.ShowLast(componentName, fetchBooks); break;
            default: break;
        }
    }

    const ShowNext = () => {
        switch (componentName) {
            case 'character': PageService.ShowNext(componentName, fetchCharacters); break;
            case 'house': PageService.ShowNext(componentName, fetchHouses); break;
            case 'book': PageService.ShowNext(componentName, fetchBooks); break;
            default: break;
        }
    }

    const ShowPrev = () => {
        switch (componentName) {
            case 'character': PageService.ShowPrev(componentName, fetchCharacters); break;
            case 'house': PageService.ShowPrev(componentName, fetchHouses); break;
            case 'book': PageService.ShowPrev(componentName, fetchBooks); break;
            default: break;
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-xs-12 col-md-4 my-2">
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col-auto">
                            <input className="form-control" type="number" min="1" max="50" value={pageSize} onChange={(e) => setPageSize(e.target.value)} placeholder={PageService.pageSize}/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-light mx-2" onClick={FetchData}>Update Size</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-md-4">
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-light mx-2" onClick={ShowFirst}>First</button>
                    <button className="btn btn-light mx-2" onClick={ShowPrev}>Prev</button>
                    <button className="btn btn-light mx-2" onClick={ShowNext}>Next</button>
                    <button className="btn btn-outline-light mx-2" onClick={ShowLast}>Last</button>
                </div>
            </div>
            <div className="col-xs-12 col-md-4 mt-2 text-center">
                <h5 id="numberOfPages"> {GetCurrentPage()} of {GetLastPage()}</h5>
            </div>
        </div>
    );
}

export default Pagination;