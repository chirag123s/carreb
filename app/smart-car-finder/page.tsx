import React, {Suspense} from 'react';
import PageContent from './PageContent'
import './style.css'; 

export const metadata = {
  title: "Carreb - Smart Car Finder",
};

export default function SmartCarFinderPage() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <PageContent />
      </Suspense>
    </>
  )
}