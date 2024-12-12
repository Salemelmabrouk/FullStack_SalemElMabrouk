// src/components/ProductList.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
};

const ProductList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    return (
        <div>
            {data.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <img src={product.thumbnail} alt={product.name} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
