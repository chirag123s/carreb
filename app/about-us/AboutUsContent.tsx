import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

type TeamMember = {
  name: string;
  title: string;
  image: string;
  bio: string;
};

const team: TeamMember[] = [
  {
    name: "Gioacchino Marmotta",
    title: "CEO",
    image: "/images/profile-Jock.jpg",
    bio: "Gioacchino brings over two decades of global leadership experience in business strategy, product development, and commercial growth. With a strong background across finance, e-commerce, and venture building, his vision for Carreb was born from a simple question: Why is it so hard to understand what a car really costs? His mission is to make car ownership transparent, trackable, and sustainable &mdash; all in one place. At Carreb, he leads strategy, product, and partnerships with a deep focus on consumer-first innovation.",
  },
  {
    name: "Manuel Perez",
    title: "Co-Founder",
    image: "/images/profile-Manny.jpeg",
    bio: "With a sharp eye for product and a background in scaling startups, Manuel brings a rare mix of creative thinking and technical depth. As a co-founder, he plays a key role in shaping Carreb's platform &mdash; ensuring every feature is built around real user needs. Manuel's experience in fintech, logistics, and digital marketplaces gives Carreb a future-focused edge, making car data not just accessible, but actionable.",
  },
  {
    name: "Kanchi Vishrolia",
    title: "Marketing and Media",
    image: "/images/profile-Kanchi.jpg",
    bio: "Kanchi leads all things content and communication at Carreb. With a sharp eye for strategy and creativity, she crafts campaigns, manages social media, and builds the brand's voice across platforms. Her mission? To make car insights simple, relatable, and engaging",
  },
  {
    name: "Chirag Soni",
    title: "Software Engineer",
    image: "/images/profile-Soni.jpg",
    bio: "Chirag blends sharp technical expertise with a deep understanding of business and product. At Carreb, he plays a key role in building the platform's data-driven backbone &mdash; turning complex information into actionable insights. With a calm, analytical approach, Chirag ensures our tools are not just powerful, but practical for everyday Australians.",
  },
];


export default function AboutUsContent() {
  return (
    <>
      <Head>
        <title>Carreb - About us</title>
      </Head>
      <div className="mb-8">
        <div className="relative min-h-[400px] flex items-center justify-center text-white">
          <div className="container">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/bg-zaptec-wLNqCa0TFIY-unsplash.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent w-full"></div>

            <div className="relative text-left z-10 px-4">
              <h1 className="text-1xl font-normal">About Carreb</h1>
              <h2 className="mt-2 text-4xl font-bold">Driving Clarity in a World of Complexity</h2>
            </div>
          </div>
        </div>
        <section className="container pt-8 pb-8">
          <h2 className="hidden text-4xl font-bold mb-4 text-teal-900">About Carreb</h2>
          <p>We're living through one of the biggest transitions in modern history &mdash; from petrol and diesel to electric, hybrid, hydrogen, and even synthetic fuels. Governments are racing toward Net Zero by 2050. Carmakers are reimagining the future of mobility. But for everyday consumers? It's more confusing than ever.</p>
          <p>While the industry pushes forward with innovation, the average car buyer is left navigating a storm of new acronyms, fluctuating costs, unclear incentives, and unfamiliar technologies. What once was a simple decision based on price and performance now involves decoding battery ranges, understanding emissions ratings, comparing running costs, and predicting resale values &mdash; all without a clear place to start. The choices are growing, but so is the uncertainty.</p>
          <p className="text-bold text-2xl font-bold">So many choices. So little clarity.</p>
          <p>Rising living costs. Fluctuating interest rates. Government rebates. New fuel types. Financing options. What should be a practical decision? Buying a car has become a maze of complexity.</p>
          <p>The information is out there. But it's scattered, inconsistent, and often buried behind jargon and marketing hype. That's where Carreb comes in. We bring all the real-world numbers together &mdash; cost of ownership, CO₂ emissions, and savings &mdash; into one simple, transparent, and user-friendly platform. So you can finally cut through the noise, and make a decision that's right for your wallet, your lifestyle, and the planet.</p>
        </section>
        <section className="container pt-8 pb-8">
          <h2 className="text-teal-900 text-center text-4xl font-bold mb-4">Our Mission</h2>
          <p>Carreb is the world's first AI-powered platform built to answer one essential question: <span className="font-bold">"What's the smartest car for my wallet &mdash; and the planet?"</span> Instead of flashy features or subjective reviews, Carreb focuses on the facts &mdash; the three things that matter most today:</p>
          <p className="text-bold text-lg font-bold">“What's the smartest car for my wallet &mdash; and the planet?”</p>
          <ul className="list-disc padding-revert">
            <li><span className="font-bold">True Cost of Ownership</span> (COO) over 5 years</li>
            <li><span className="font-bold">CO<sub>2</sub> Emissionsp</span></li>
            <li><span className="font-bold">Your potential savings</span></li>
          </ul>
          <p>In just minutes, not months, Carreb gives you real, unbiased, and easy-to-understand insights &mdash; all without needing a finance degree or hours of research.</p>
        </section>
        <section className="container pt-8 pb-8">
          <h2 className="text-teal-900 text-center text-4xl font-bold mb-4">Why Does Carreb Exist?</h2>
          <p>This isn't just about cars. It's about:</p>
          <ul className="list-disc padding-revert">
            <li><span className="font-bold">Helping Australians survive a cost-of-living crisis</span></li>
            <li><span className="font-bold">Making complex car data simple and accessible</span></li>
            <li><span className="font-bold">Empowering people to make affordable, low-emission choices</span></li>
          </ul>
          <p>We believe that clarity drives better decisions &mdash; and better decisions lead to real savings, for you and the planet.</p>
        </section>
        <section className="container pt-8 pb-8">
          <h2 className="text-teal-900 text-center text-4xl font-bold mb-4">Meet the team of Carreb</h2>
          <p>At Carreb, we're driven by the belief that smarter car decisions can empower everyday consumers to live better. Behind the platform is a passionate, experienced team committed to clarity, innovation, and impact.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-1 gap-8 pt-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl shadow p-6 text-center bg-slate-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-34 h-34 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <h4 className="font-medium">{member.title}</h4>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="container pt-8 pb-8">
          <h2 className="text-teal-900 text-center text-4xl font-bold mb-4">Our Promise</h2>
          <p>No jargon. No bias. No guesswork. Just the real numbers that matter. Whether you're buying your first car, switching to electric, or just trying to stretch your budget further, Carreb is here to guide you &mdash; clearly, quickly, and with integrity.</p>
          <p className="font-medium italic">Because when you know better, you drive better!</p>
        </section>
      </div>
    </>
  )
}