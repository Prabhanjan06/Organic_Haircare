// // src/App.js or any other component
// import React, { useEffect, useState } from 'react';

// const Card = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//       fetch('http://localhost:3001/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Product List</h1>
//             <ul>
//                 {products.map(product => (
//                     <li key={product.product_id}>
//                         {product.product_name} - ${product.product_price}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Card;

import React, { useEffect, useState } from "react";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            {product.product_name} - ${product.product_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
