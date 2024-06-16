import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/products/', { withCredentials: true });
                console.log("RESPPP", response);
                if (response.data && Array.isArray(response.data.data.docs)) {
                    setProducts(response.data.data.docs);
                } else {
                    console.error('Invalid response data:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -carouselRef.current.clientWidth,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: carouselRef.current.clientWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative m-4">
            <br />
            <div>
                <h1 className="ms-4 m-8 font-Roboto text-2xl font-extrabold mb-2">Best Sellers</h1>
                <hr />
                <h2 className="ms-6 font-Roboto text-l font-semibold text-gray-800">This week</h2>
            </div>
            <br />
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 z-10"
                onClick={scrollLeft}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div
                ref={carouselRef}
                className="flex overflow-x-scroll space-x-4"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {products.map(product => (
                    <div key={product.id} style={{ flex: '0 0 20%' }}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 z-10"
                onClick={scrollRight}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default ProductCarousel;
