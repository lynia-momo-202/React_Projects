import React, { useEffect, useState } from 'react'
import './App.css'
import { productData } from './products'

function ProductSearch() {

    const [val, setVal] = useState('')
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [productSeach, setProductSeach] = useState([])

    useEffect(() => {
        const GetProduct = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();
                console.log(data);
                setProducts(data);
                setProductSeach(data);
            } catch (error) {
                console.log("fail to fetch product", error);
                setProducts(productData);
                setProductSeach(productData);
            } finally {
                setLoading(false)
            }
        }
        GetProduct();
    }, [])

    const handleSearch = (value) => {
        // if(value===""){
        //     window.location.reload()
        // }
        setVal(value)

        const productsCopy = [...products]
        const productsSeach = productsCopy.filter(v => (v.title.toLowerCase()).includes(value.toLowerCase()))
        setProductSeach(productsSeach)
    }

    return (
        <div className='product-search-container'>
            <h2>Product display</h2>
            <input className='search-input'
                placeholder='Seach for a product...'
                value={val}
                onChange={(e) => handleSearch(e.target.value)}
            />

            {
                !loading &&
                (productSeach.length
                    ?
                    (<section className='products-grid'>
                        {
                            productSeach.map((product) => (
                                <div key={product.id} className='product-card'>
                                    <h4>{product.title}</h4>
                                    <img src={product.image} />
                                    <p>Price : ${product.price}</p>
                                </div>
                            ))
                        }
                    </section>)
                    :
                    <p className='message'>products not available </p>
                )
            }

            {
                loading && <div className='products-grid'>Loading...</div>
            }
        </div>
    )
}

export default ProductSearch