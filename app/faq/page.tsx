import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import FAQContent from './FAQContent'
export const metadata = {
  title: "Carreb - Terms of Use",
};

export default function FAQPage() {
  return (
    <>
      <FAQContent />
    </>
  )
}