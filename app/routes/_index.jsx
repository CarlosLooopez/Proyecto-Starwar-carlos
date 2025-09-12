import { Link, useLoaderData } from "react-router"

export async function loader() {
  const response = await fetch('https://www.swapi.tech/api/');
  return response.json();
}

export default function Home() {
  const data = useLoaderData();
  console.log(Object.entries(data.result));

  return (
    <div className="d-grid">
      {Object.entries(data.result).map((elemento, index) => (
        <Link
         key={index} 
         to={`/${elemento[0]}`}
         params={elemento[1]}
         >
          {elemento[0]}
          </Link>
      ))}
    </div>
  );
}