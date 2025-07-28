import { Metadata } from 'next';

export interface EODMetadataConfig {
  title: string;
  description: string;
  keywords?: string | string[];
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  author?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  ldJsonType?: 'Organization' | 'WebPage' | 'Article' | 'Product' | 'Service';
  ldJsonData?: Record<string, unknown>;
}

const defaultConfig = {
  url: 'https://engineer-as-a-service.whytilt.com',
  siteName: 'Tilt - Engineer as a Service (EaaS)',
  image: '/og-image.png',
  imageAlt: 'Tilt - Engineer as a Service (EaaS) - Expert engineers instantly',
  type: 'website' as const,
  locale: 'en_US',
  twitterHandle: '@tiltapp',
  ldJsonType: 'Service' as const,
};

export function createMetadata(config: EODMetadataConfig): Metadata {
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Handle keywords array
  const keywordsArray = Array.isArray(mergedConfig.keywords) 
    ? mergedConfig.keywords 
    : typeof mergedConfig.keywords === 'string' 
      ? mergedConfig.keywords.split(',').map(k => k.trim())
      : [];

  const metadata: Metadata = {
    metadataBase: new URL('https://engineer-as-a-service.whytilt.com'),
    title: mergedConfig.title,
    description: mergedConfig.description,
    keywords: keywordsArray,
    openGraph: {
      title: mergedConfig.title,
      description: mergedConfig.description,
      url: mergedConfig.url,
      siteName: mergedConfig.siteName,
      images: [
        {
          url: mergedConfig.image,
          width: 1200,
          height: 630,
          alt: mergedConfig.imageAlt,
        },
      ],
      locale: mergedConfig.locale,
      type: mergedConfig.type,
      ...(mergedConfig.publishedTime && { publishedTime: mergedConfig.publishedTime }),
      ...(mergedConfig.modifiedTime && { modifiedTime: mergedConfig.modifiedTime }),
      ...(mergedConfig.section && { section: mergedConfig.section }),
      ...(mergedConfig.author && { authors: [mergedConfig.author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: mergedConfig.title,
      description: mergedConfig.description,
      images: [mergedConfig.image],
      creator: mergedConfig.twitterHandle,
      site: mergedConfig.twitterHandle,
    },
  };

  return metadata;
}

export function createLdJson(config: EODMetadataConfig) {
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Base structured data
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': mergedConfig.ldJsonType,
    name: mergedConfig.siteName,
    url: mergedConfig.url,
    description: mergedConfig.description,
  };

  // Type-specific structured data
  let structuredData: Record<string, unknown> = { ...baseStructuredData };

  switch (mergedConfig.ldJsonType) {
    case 'Organization':
      structuredData = {
        ...structuredData,
        logo: `${mergedConfig.url}/logo.png`,
        sameAs: [
          'https://twitter.com/tiltapp',
          'https://linkedin.com/company/tilt',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US'
        },
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'EOD Team'
        }
      };
      break;
      
    case 'Service':
      structuredData = {
        ...structuredData,
        '@type': 'Service',
        serviceType: 'Professional Engineering Services',
        areaServed: {
          '@type': 'Country',
          name: 'United States'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full Stack Development',
                description: 'Expert full-stack engineering services'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Backend Development',
                description: 'Specialized backend and infrastructure services'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'DevOps & Cloud',
                description: 'Cloud architecture and DevOps services'
              }
            }
          ]
        },
        provider: {
          '@type': 'Organization',
          name: 'Tilt - Engineer as a Service',
          url: mergedConfig.url
        }
      };
      break;
      
    case 'WebPage':
      structuredData = {
        ...structuredData,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'Organization',
          name: 'Tilt - Engineer as a Service',
          url: mergedConfig.url,
          logo: `${mergedConfig.url}/logo.png`
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: mergedConfig.url
            }
          ]
        }
      };
      break;
  }

  // Merge any custom LD+JSON data
  if (mergedConfig.ldJsonData) {
    structuredData = { ...structuredData, ...mergedConfig.ldJsonData };
  }

  return structuredData;
}

export function LdJsonScript({ config }: { config: EODMetadataConfig }) {
  const structuredData = createLdJson(config);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}