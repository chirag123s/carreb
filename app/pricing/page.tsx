import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import PricingContent from './PricingContent'
import './style.css'; 

export const metadata = {
  title: "Carreb - Pricing",
};

export default function PricingPage() {
  return (
    <>
      <PricingContent />
    </>
  )
}