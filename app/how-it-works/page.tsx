import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import HowItWorksContent from './HowItWorksContent'
import './style.css'; 

export const metadata = {
  title: "Carreb - How It Works",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksContent />
    </>
  )
}