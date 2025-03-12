'use client';

import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';

interface CarouselImage {
  url: string;
  caption?: string;
}

const CarouselX = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const { height } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const imageList = querySnapshot.docs.map((doc) => ({
          url: doc.data().url,
          caption: doc.data().caption
        }));
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  if (images.length === 0) {
    return (
      <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading images...</p>
      </div>
    );
  }

  return (
    <Carousel 
      fade 
      interval={3000} 
      indicators={true}
      controls={true}
      className="w-full rounded-lg overflow-hidden shadow-lg"
    >
      {images.map((image, index) => (
        <Carousel.Item key={index} onClick={() => router.push('/gallery')} style={{ cursor: 'pointer' }}>
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            style={{
              height: height / 2.2,
              width: '100%',
              objectFit: 'cover',
            }}
          />
          {image.caption && (
            <Carousel.Caption className="bg-black bg-opacity-50 rounded p-2">
              <p className="mb-0">{image.caption}</p>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselX;
