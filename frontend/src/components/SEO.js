import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords,
  canonical,
  type = 'website',
  image,
  noindex = false 
}) => {
  const siteTitle = 'Shoulder & Elbow Society of India (SESI)';
  const defaultDescription = 'Official website of the Shoulder & Elbow Society of India (SESI). Join 480+ active members, access CME credits, events, publications, and advance shoulder & elbow surgery in India.';
  const defaultKeywords = 'SESI, Shoulder Elbow Society India, orthopaedic society, shoulder surgery, elbow surgery, medical education, CME';
  const siteUrl = 'https://sesionline.in';
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const pageImage = image || `${siteUrl}/sesi-og-image.png`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
    </Helmet>
  );
};

export default SEO;
