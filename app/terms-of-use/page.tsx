import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import TermsOfUseContent from './TermsOfUseContent'
export const metadata = {
  title: "Carreb - Terms of Use",
};

export default function TermsOfUsePage() {
  return (
    <>
      <TermsOfUseContent />
    </>
  )
}