'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PrivacyPolicy() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const STRAPI_PRIVACY_API = import.meta.env.VITE_STRAPI_PRIVACY_POLICY_URL;

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await fetch(STRAPI_PRIVACY_API);
        const data = await res.json();
        const policy = data?.data?.[0]?.Content || '';
        setContent(policy);
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-14 text-dental-text-secondary bg-white shadow-sm rounded-xl">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-dental-primary leading-tight">
        Privacy Policy
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-500 animate-pulse">Loading...</div>
      ) : (
        <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-headings:font-semibold prose-h2:text-dental-secondary prose-h3:text-gray-700 prose-p:text-gray-600 prose-li:marker:text-dental-secondary prose-a:text-dental-primary prose-a:underline">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      )}
    </section>
  );
}
