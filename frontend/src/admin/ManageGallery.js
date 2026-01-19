import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const ManageGallery = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const bulkFileInputRef = useRef(null);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [albumFormData, setAlbumFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    category: ''
  });
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const categories = ['Conference', 'Workshop', 'CME', 'Award Ceremony', 'Social Event', 'Other'];

  useEffect(() => {
    const token = localStorage.getItem('sesi_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchAlbums();
  }, [navigate]);

  const fetchAlbums = async () => {
    try {
      const response = await adminAPI.getAlbums();
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('sesi_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await adminAPI.getAlbumPhotos(albumId);
      setAlbumPhotos(response.data);
    } catch (error) {
      console.error('Error fetching album photos:', error);
    }
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      if (editingAlbum) {
        await adminAPI.updateAlbum(editingAlbum.id, albumFormData);
      } else {
        await adminAPI.createAlbum(albumFormData);
      }
      setShowAlbumForm(false);
      resetAlbumForm();
      fetchAlbums();
    } catch (error) {
      console.error('Error saving album:', error);
      alert('Error saving album. Please try again.');
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album and all its photos?')) {
      try {
        await adminAPI.deleteAlbum(albumId);
        if (selectedAlbum?.id === albumId) {
          setSelectedAlbum(null);
          setAlbumPhotos([]);
        }
        fetchAlbums();
      } catch (error) {
        console.error('Error deleting album:', error);
        alert('Error deleting album.');
      }
    }
  };

  const handleBulkUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedAlbum) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      await adminAPI.uploadAlbumPhotosBulk(selectedAlbum.id, formData);
      fetchAlbumPhotos(selectedAlbum.id);
      fetchAlbums(); // Update photo count
      if (bulkFileInputRef.current) {
        bulkFileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Error uploading photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await adminAPI.deleteImage(photoId);
        fetchAlbumPhotos(selectedAlbum.id);
        fetchAlbums(); // Update photo count
      } catch (error) {
        console.error('Error deleting photo:', error);
        alert('Error deleting photo.');
      }
    }
  };

  const resetAlbumForm = () => {
    setAlbumFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      category: ''
    });
    setEditingAlbum(null);
  };

  const openEditAlbum = (album) => {
    setAlbumFormData({
      title: album.title,
      description: album.description || '',
      event_date: album.event_date || '',
      location: album.location || '',
      category: album.category || ''
    });
    setEditingAlbum(album);
    setShowAlbumForm(true);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}/api${imageUrl}`;
  };

  const filteredAlbums = filterCategory === 'all'
    ? albums
    : albums.filter(album => album.category === filterCategory);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Gallery</h1>
            <p className="text-gray-600 mt-1">Create event albums and upload multiple photos</p>
          </div>
          <button
            onClick={() => { setShowAlbumForm(true); resetAlbumForm(); }}
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            data-testid="create-album-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Event Album
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterCategory === 'all' 
                ? 'bg-amber-700 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Events ({albums.length})
          </button>
          {categories.map(cat => {
            const count = albums.filter(a => a.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterCategory === cat 
                    ? 'bg-amber-700 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Albums List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Event Albums</h2>
            {filteredAlbums.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-500">No albums yet</p>
                <p className="text-sm text-gray-400 mt-1">Create an album to start adding photos</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    className={`bg-white rounded-xl shadow overflow-hidden cursor-pointer transition hover:shadow-md ${
                      selectedAlbum?.id === album.id ? 'ring-2 ring-amber-500' : ''
                    }`}
                    onClick={() => { setSelectedAlbum(album); fetchAlbumPhotos(album.id); }}
                    data-testid={`album-${album.id}`}
                  >
                    <div className="flex">
                      <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                        {album.cover_image ? (
                          <img 
                            src={getImageUrl(album.cover_image)} 
                            alt={album.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{album.title}</h3>
                        <p className="text-xs text-gray-500">{album.category || 'Uncategorized'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            {album.photo_count || 0} photos
                          </span>
                          {album.event_date && (
                            <span className="text-xs text-gray-400">{album.event_date}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Album Photos */}
          <div className="lg:col-span-2">
            {selectedAlbum ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Album Header */}
                <div className="p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedAlbum.title}</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAlbum.category && (
                          <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                            {selectedAlbum.category}
                          </span>
                        )}
                        {selectedAlbum.event_date && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {selectedAlbum.event_date}
                          </span>
                        )}
                        {selectedAlbum.location && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {selectedAlbum.location}
                          </span>
                        )}
                      </div>
                      {selectedAlbum.description && (
                        <p className="text-gray-600 mt-2">{selectedAlbum.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditAlbum(selectedAlbum)}
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(selectedAlbum.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center gap-4">
                    <input
                      ref={bulkFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleBulkUpload}
                      className="hidden"
                      id="bulk-upload"
                    />
                    <label
                      htmlFor="bulk-upload"
                      className={`flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {uploading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-700 border-t-transparent"></div>
                          <span className="text-gray-600">Uploading photos...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600">Click to upload photos (select multiple)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Photos Grid */}
                <div className="p-4">
                  {albumPhotos.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500">No photos in this album yet</p>
                      <p className="text-sm text-gray-400 mt-1">Upload photos using the button above</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {albumPhotos.map((photo) => (
                        <div key={photo.id} className="aspect-square relative group rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={getImageUrl(photo.image_url)}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Album</h3>
                <p className="text-gray-500">Choose an album from the left to view and manage its photos</p>
              </div>
            )}
          </div>
        </div>

        {/* Create/Edit Album Modal */}
        {showAlbumForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingAlbum ? 'Edit Album' : 'Create Event Album'}
                </h2>
                <button onClick={() => setShowAlbumForm(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateAlbum} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event/Album Title *</label>
                  <input
                    type="text"
                    value={albumFormData.title}
                    onChange={(e) => setAlbumFormData({ ...albumFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., SESICON 2025"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={albumFormData.category}
                      onChange={(e) => setAlbumFormData({ ...albumFormData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                      type="text"
                      value={albumFormData.event_date}
                      onChange={(e) => setAlbumFormData({ ...albumFormData, event_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., January 2025"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={albumFormData.location}
                    onChange={(e) => setAlbumFormData({ ...albumFormData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., Mumbai, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={albumFormData.description}
                    onChange={(e) => setAlbumFormData({ ...albumFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="Brief description of the event..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAlbumForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium"
                  >
                    {editingAlbum ? 'Update Album' : 'Create Album'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageGallery;
