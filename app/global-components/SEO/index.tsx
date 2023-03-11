import React from "react";

type Props = {
  seoTitle?: string;
  seoDescription?: string;
  seoImg?: string;
};

const SEOTags: React.FC<Props> = ({ seoTitle, seoDescription, seoImg }) => {
  return (
    <head>
      {/* <title key="title">{seoTitle || PAGE_SEO_TITLE}</title>
      <meta
        key="ogTitle"
        property="og:title"
        content={seoTitle || PAGE_SEO_TITLE}
      />
      <meta
        key="twitterTitle"
        name="twitter:title"
        content={seoTitle || PAGE_SEO_TITLE}
      />

      <meta
        key="description"
        name="description"
        content={seoDescription || PAGE_SEO_DESCRIPTION}
      />
      <meta
        key="ogDescription"
        property="og:description"
        content={seoDescription || PAGE_SEO_DESCRIPTION}
      />
      <meta
        key="twitterDescription"
        name="twitter:description"
        content={seoDescription || PAGE_SEO_DESCRIPTION}
      />
      <meta
        key="ogImage"
        property="og:image"
        content={seoImg || PAGE_SEO_IMG}
      />
      <meta
        key="twitterImage"
        name="twitter:image"
        content={seoImg || PAGE_SEO_IMG}
      /> */}
    </head>
  );
};

export default SEOTags;
