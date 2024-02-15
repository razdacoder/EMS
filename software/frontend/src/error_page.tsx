import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen flex-col gap-y-4 flex justify-center items-center"
    >
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
