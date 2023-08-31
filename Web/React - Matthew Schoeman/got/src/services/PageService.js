export class PageService {
  static pageSize = 10;
  static bookLastPage = 0;
  static houseLastPage = 0;
  static characterLastPage = 0;
  static lastPage;

  static houseCurrentPage = 1;
  static bookCurrentPage = 1;
  static characterCurrentPage = 1;

  static types = ['character', 'house', 'book'];
  static urls = ['https://www.anapioficeandfire.com/api/characters?page=1&pageSize=', 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=', 'https://www.anapioficeandfire.com/api/books?page=1&pageSize=']

  static FetchData = (size) => {
    PageService.pageSize = size;
    for (let index = 0; index < PageService.types.length; index++) {
      fetch(PageService.urls[index] + PageService.pageSize, { method: 'GET', headers: { 'Accept': 'application/json' } })
        .then(response => {
          return {
            headers: response.headers,
            json: response.json
          }
        })
        .then(data => {
          const lastPage = PageService.GetLastPageFromHeader(data.headers);
          PageService.UpdateLastPage(lastPage, PageService.types[index])
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }

  static UpdateData(fetchBooks, fetchCharacters, fetchHouses, newPageSize){
    this.FetchData(newPageSize);
    PageService.houseCurrentPage = PageService.characterCurrentPage = PageService.bookCurrentPage = 1;
    fetchBooks(PageService.characterCurrentPage, PageService.pageSize);
    fetchHouses(PageService.characterCurrentPage, PageService.pageSize);
    fetchCharacters(PageService.characterCurrentPage, PageService.pageSize);
  }

  static GetLastPageFromHeader = (headers) => {
    const linkHeader = headers.get('Link');
    if (linkHeader) {
      const regex = /<[^>]*page=(\d+)[^>]*>; rel="last"/;
      const matches = regex.exec(linkHeader);
      if (matches && matches.length > 1) {
        return +matches[1];
      }
    }
    return -1;
  }

  static UpdateLastPage = (page, type) => {
    switch (type) {
      case 'character': {
        PageService.characterLastPage = page;
        break;
      }
      case 'house': {
        PageService.houseLastPage = page;
        break;
      }
      case 'book': {
        PageService.bookLastPage = page;
        break;
      }
      default: break;
    }
  }

  static ShowNext(componentName, fetchFunction) {
    switch (componentName) {
      case 'character': {
        if (PageService.characterCurrentPage < PageService.characterLastPage) {
          PageService.characterCurrentPage += 1;
          fetchFunction(PageService.characterCurrentPage, PageService.pageSize);
        }
        break;
      }
      case 'house': {
        if (PageService.houseCurrentPage < PageService.houseLastPage) {
          PageService.houseCurrentPage += 1;
          fetchFunction(PageService.houseCurrentPage, PageService.pageSize);
        }
        break;
      }
      case 'book': {
        if (PageService.bookCurrentPage < PageService.bookLastPage) {
          PageService.bookCurrentPage += 1;
          fetchFunction(PageService.bookCurrentPage, PageService.pageSize);
        }
        break;
      }
      default: {
        
      }
    }
  }

  static ShowPrev(componentName, fetchFunction) {
    switch (componentName) {
      case 'character': {
        if (PageService.characterCurrentPage > 1) {
          PageService.characterCurrentPage -= 1;
          fetchFunction(PageService.characterCurrentPage, PageService.pageSize);
        }
        break;
      }
      case 'house': {
        if (PageService.houseCurrentPage > 1) {
          PageService.houseCurrentPage -= 1;
          fetchFunction(PageService.houseCurrentPage, PageService.pageSize);
        }
        break;
      }
      case 'book': {
        if (PageService.bookCurrentPage > 1) {
          PageService.bookCurrentPage -= 1;
          fetchFunction(PageService.bookCurrentPage, PageService.pageSize);
        }
        break;
      }
      default: break;
    }
  }
  static ShowLast(componentName, fetchFunction) {
    switch (componentName) {
      case 'character': {
        PageService.characterCurrentPage = PageService.characterLastPage; 
        fetchFunction(PageService.characterCurrentPage, PageService.pageSize);
        break;
      }
      case 'house': {
        PageService.houseCurrentPage = PageService.houseLastPage;
        fetchFunction(PageService.houseCurrentPage, PageService.pageSize);
        break;
      }
      case 'book': {
        PageService.bookCurrentPage =  PageService.bookLastPage; 
        fetchFunction(PageService.bookCurrentPage, PageService.pageSize);
        break;
      }
      default : break;
    }
  }
  static ShowFirst(componentName, fetchFunction) {
    switch (componentName) {
      case 'character': {
        PageService.characterCurrentPage = 1; 
        fetchFunction(PageService.characterCurrentPage, PageService.pageSize);
        break;
      }
      case 'house': {
        PageService.houseCurrentPage = 1; 
        fetchFunction(PageService.houseCurrentPage, PageService.pageSize);
        break;
      }
      case 'book': {
        PageService.bookCurrentPage = 1; 
        fetchFunction(PageService.bookCurrentPage, PageService.pageSize);
        break;
      }
      default: break;
    }
  }
}
