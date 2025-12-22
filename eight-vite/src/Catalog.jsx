import { useEffect, useState } from "react";

export default function Catalog() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/businesses")
      .then(res => res.json())
      .then(data => setBusinesses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {businesses.map(b => (
        <div key={b.id} className="p-4 border-b">
          <h2 className="text-xl font-bold">{b.name}</h2>
          <p>{b.description}</p>
        </div>
      ))}
    </div>
  );
}
