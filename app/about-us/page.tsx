import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import AboutUsContent from './AboutUsContent'
export const metadata = {
  title: "Carreb - About us",
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUsContent />
    </>
  )
}