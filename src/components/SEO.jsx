import { useEffect } from 'react';

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://riptidescocktailsandgrill.com'
).replace(/\/$/, '');

export default function SEO({
  title,
  description,
  path = '/',
  image,
  type = 'website',
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;

    const tags = {
      description,
      'og:title': title,
      'og:description': description,
      'og:type': type,
      'og:url': canonicalUrl,
      'og:site_name': 'RipTides Cocktails & Grill',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };

    if (image) {
      // Supports imported Vite assets such as outdoor.webp
      const imageUrl = image.startsWith('http')
        ? image
        : `${window.location.origin}${image}`;

      tags['og:image'] = imageUrl;
      tags['twitter:image'] = imageUrl;
    }

    Object.entries(tags).forEach(([name, content]) => {
      if (!content) return;

      const isProperty = name.startsWith('og:');

      let el = document.head.querySelector(
        `meta[${isProperty ? 'property' : 'name'}="${name}"]`
      );

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(
          isProperty ? 'property' : 'name',
          name
        );
        document.head.appendChild(el);
      }

      el.setAttribute('content', content);
    });

    // Canonical URL
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', canonicalUrl);

    // Robots
    let robots = document.head.querySelector(
      'meta[name="robots"]'
    );

    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }

    robots.setAttribute(
      'content',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
  }, [title, description, path, image, type]);

  return null;
}