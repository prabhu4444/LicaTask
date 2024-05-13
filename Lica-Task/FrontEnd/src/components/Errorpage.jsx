import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Maybe the following services are not yet implemented.</p>
      <p>Please wait. They are comming soon</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}