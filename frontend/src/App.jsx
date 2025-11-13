import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);
  const [priceMap, setPriceMap] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const fetchPrice = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/products/${id}/price`);
      setPriceMap(prev => ({ ...prev, [id]: res.data.finalPrice }));
    } catch (err) {
      setPriceMap(prev => ({ ...prev, [id]: 'error' }));
    }
  };

  const createSample = async () => {
    await axios.post('http://localhost:8080/products', {
      name: 'Sample Shirt',
      category: 'Apparel',
      basePrice: 49.99
    });
    const res = await axios.get('http://localhost:8080/products');
    setProducts(res.data);
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>RetailStore Demo</h1>
      <button onClick={() => window.location.reload()}>Refresh</button>
      <button style={{ marginLeft: '1rem' }} onClick={createSample}>Create Sample Product</button>
      <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Base Price</th>
            <th>Final Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.basePrice}</td>
              <td>{priceMap[p.id] ?? '-'}</td>
              <td><button onClick={() => fetchPrice(p.id)}>Get Price</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
