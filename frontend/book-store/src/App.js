import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import "./App.css";
import { getBookById } from "./graphql/queries/book";
import { onCreateBook } from "./graphql/subscriptions/book";

function App() {
  const [book, setBook] = useState(null);

  const getBook = async () => {
    // make a call to appsync api
    // const book = await API.graphql(
    //   graphqlOperation(getBookById, {
    //     id: "69e9c1d6-7b3d-4b2d-8ed9-ee29d7773757",
    //   })
    // );

    const book = await API.graphql({
      query: getBookById,
      variables: { id: "69e9c1d6-7b3d-4b2d-8ed9-ee29d7773757" },
      authMode: "AWS_IAM", // AWS_IAM for guest user access. Default is Cognito user pool
    });
    setBook(book.data.getBookById);
  };

  useEffect(() => {
    // whenever a new book is added we get the notification as we have subscribed to createBook mutation
    const subscription = API.graphql(graphqlOperation(onCreateBook)).subscribe({
      next: (result) => {
        console.log(result);
        const newBook = result.value.data.onCreateBook;
        setBook(newBook);
      },
    });
  });

  const viewBook = () => {
    if (book) {
      return (
        <article>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <p>{book.author}</p>
          <h4>{book.price}</h4>
        </article>
      );
    }
  };

  return (
    <div>
      {/* <AmplifySignOut /> */}
      <AmplifySignOut />
      <section className="book-section">
        <button onClick={() => getBook()}>Get book details</button>
        <hr />
        {viewBook()}
      </section>
    </div>
  );
}

export default withAuthenticator(App);
// export default App;
