import React, { useState, useEffect } from 'react';
import { publicAPI } from '../utils/api';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = ['all', 'Conference', 'Workshop', 'CME', 'Award Ceremony', 'Social Event'];

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await publicAPI.getAlbums();
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const fetchAlbumDetails = async (albumId) => {
    try {
      const response = await publicAPI.getAlbum(albumId);
      setSelectedAlbum(response.data);
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}/api${imageUrl}`;
  };

  const filteredAlbums = filter === 'all'
    ? albums
    : albums.filter(album => album.category === filter);

  const openLightbox = (photo, index) => {
    setSelectedImage(photo);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction) => {
    if (!selectedAlbum?.photos) return;
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < selectedAlbum.photos.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(selectedAlbum.photos[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 via-amber-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="gallery-title">Event Gallery</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Browse photos from SESI conferences, workshops, CME programs, and special events.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setSelectedAlbum(null); }}
                className={`px-5 py-2 rounded-full font-medium transition whitespace-nowrap capitalize ${
                  filter === cat
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              >
                {cat === 'all' ? 'All Events' : cat}
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
        ) : selectedAlbum ? (
          /* Album Detail View */
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedAlbum(null)}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-6 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Albums
            </button>

            {/* Album Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedAlbum.title}</h2>
              <div className="flex flex-wrap gap-4 text-gray-600">
                {selectedAlbum.category && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {selectedAlbum.category}
                  </span>
                )}
                {selectedAlbum.event_date && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedAlbum.event_date}
                  </span>
                )}
                {selectedAlbum.location && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedAlbum.location}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedAlbum.photo_count} Photos
                </span>
              </div>
              {selectedAlbum.description && (
                <p className="text-gray-600 mt-4">{selectedAlbum.description}</p>
              )}
            </div>

            {/* Photos Grid */}
            {selectedAlbum.photos && selectedAlbum.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedAlbum.photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(photo, index)}
                  >
                    <img
                      src={getImageUrl(photo.image_url)}
                      alt={photo.title || selectedAlbum.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No photos in this album yet</p>
              </div>
            )}
          </div>
        ) : filteredAlbums.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Event Albums Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {filter !== 'all' 
                ? `No albums in the "${filter}" category yet. Check back soon!`
                : 'Event photo albums will be added here soon.'}
            </p>
          </div>
        ) : (
          /* Albums Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="albums-grid">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition"
                onClick={() => fetchAlbumDetails(album.id)}
                data-testid={`album-card-${album.id}`}
              >
                {/* Cover Image */}
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
                  {album.cover_image ? (
                    <img
                      src={getImageUrl(album.cover_image)}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Photo Count Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {album.photo_count || 0}
                  </div>
                  {/* Category Badge */}
                  {album.category && (
                    <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {album.category}
                    </div>
                  )}
                </div>

                {/* Album Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition mb-2">
                    {album.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    {album.event_date && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {album.event_date}
                      </span>
                    )}
                    {album.location && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {album.location}
                      </span>
                    )}
                  </div>
                  {album.description && (
                    <p className="text-gray-600 mt-3 text-sm line-clamp-2">{album.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && selectedAlbum && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          {currentImageIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition p-2 bg-black/30 rounded-full"
              onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {currentImageIndex < selectedAlbum.photos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition p-2 bg-black/30 rounded-full"
              onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={getImageUrl(selectedImage.image_url)}
              alt={selectedImage.title || selectedAlbum.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {/* Image Counter */}
            <div className="text-center mt-4 text-white/70">
              {currentImageIndex + 1} / {selectedAlbum.photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
