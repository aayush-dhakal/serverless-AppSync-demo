export const getBookById = `
    query getBookById($id: ID!) { 
        getBookById(bookId: $id) {
            author
            bookId
            price
            description
            title
        }
    }
`; // we get id as input from the second paramter from the graphqlOperation
