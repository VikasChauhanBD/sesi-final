import React, { useState, useEffect } from 'react';
import { publicAPI } from '../utils/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = ['all', 'Conference', 'Workshop', 'CME', 'Award Ceremony', 'Social Event'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await publicAPI.getGallery({ limit: 100 });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 via-amber-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="gallery-title">Photo Gallery</h1>
          <p className="text-white/90 max-w-2xl">
            Memories from SESI conferences, workshops, CME programs, and social events.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-medium transition whitespace-nowrap capitalize ${
                  filter === cat
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent"></div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
            <p className="text-gray-500">
              Photos from upcoming events will be added here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="gallery-grid">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={`${BACKEND_URL}/api${image.image_url}`}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Placeholder Gallery for Empty State */}
        {images.length === 0 && !loading && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Highlights Coming Soon</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-amber-300 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-amber-700 font-medium">Coming Soon</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-500 transition"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img
              src={`${BACKEND_URL}${selectedImage.image_url}`}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-bold text-lg">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-white/70 mt-1">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
