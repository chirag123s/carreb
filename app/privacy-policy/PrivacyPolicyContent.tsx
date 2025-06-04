import React from 'react';
import Image from 'next/image';
import Head from 'next/head';


export default function PrivacyPolicyContent() {
  return (
    <>
      <Head>
        <title>Carreb - Privacy Policy</title>
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
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
          </div>
        </div>
        <section className="container pt-8 pb-8">
          <ol className='list-decimal p-revert'>
            <li className='pb-4'>
              <h3>Who We Are</h3>
              <p>Carreb Pty Ltd (ACN 686120892) operates a data-driven, AI-powered decision support platform that helps Australians understand the true cost of vehicle ownership, associated CO₂ emissions, and potential financial savings. We do not sell vehicles or financial products. </p>
            </li>
            <li className='pb-4'>
              <h3>What Personal Data We Collect</h3>
              <p>All content on this website, including the CORE™ Rating, Smart Finder outputs, text, graphics, and software, is the intellectual property of Carreb or its licensors, and is protected under applicable copyright, trademark, and other intellectual property laws. Users are granted a limited, non-transferable, and non-exclusive license to access and use the site for personal, non-commercial purposes only. </p>
            </li>
            <li className='pb-4'>
              <h3>Use of Data and Content </h3>
              <p>We collect only what is necessary for our platform to function effectively. This may include: </p>
              <ul className='list-disc p-revert'>
                <li>Identity Data: Name, email address, user ID (if applicable) </li>
                <li>Vehicle Preferences: Make, model, state/region, budget, fuel type, usage, kilometres driven, ownership goals </li>
                <li>Financial Inputs: Loan terms, estimated trade-in value (user-entered only) </li>
                <li>Location Data: Approximate region for emissions modelling and savings calculations </li>
                <li>Usage Data: Pages visited, features used, time spent, navigation patterns </li>
                <li>Technical Data: IP address, device type, OS, browser type </li>
                <li>Optional Inputs: Survey responses, feedback, and optional profiling fields</li>
              </ul>
              <p>We do not collect sensitive personal information such as health, biometric, racial, or religious data. We do not collect driver's licence, bank details, or government ID numbers. </p>
            </li>
            <li className='pb-4'>
              <h3>How We Collect It</h3>
              <ul className='list-disc p-revert'>
                <li>Directly from you when you register, enter preferences, or provide feedback </li>
                <li>Automatically via cookies, pixels, and analytics platforms </li>
                <li>Through secure integrations with third-party services (e.g., analytics, AI modelling, user support) </li>
              </ul>
            </li>
            <li className='pb-4'>
              <h3>Why We Collect Your Data </h3>
              <p>We use your data to: </p>
              <ul className='list-disc p-revert'>
                <li>Deliver accurate Cost of Ownership (COO) and emissions estimates  </li>
                <li>Provide personalised vehicle insights and Smart Finder results  </li>
                <li>Improve platform performance and user experience  </li>
                <li>Communicate with you about your account, new features, or offers (if opted in)  </li>
                <li>Comply with legal obligations and prevent misuse of the platform </li>
              </ul>
            </li>
            <li className='pb-4'>
              <h3>Cookies, Analytics, and Tracking </h3>
              <p>We use cookies and third-party tools (e.g., Google Analytics, Hotjar) to understand how users interact with our platform. You may manage cookie preferences via your browser or by using our on-site cookie banner. </p>
              <p><u>Banner:</u> "We use cookies to improve your experience, personalise content, and analyse site traffic. Some cookies are essential; others help us improve our services. By clicking 'Accept All', you consent to all cookies. You can adjust your settings at any time." </p>
            </li>
            <li className='pb-4'>
              <h3>International Transfers </h3>
              <p>Some data may be processed outside of Australia (e.g., analytics services or cloud partners). We ensure that all international transfers comply with applicable Australian Privacy Principles (APPs) and international safeguards such as GDPR-equivalent protections. </p>
            </li>
            <li className='pb-4'>
              <h3>Data Security </h3>
              <p>We maintain industry-standard security protocols, including: </p>
              <ul className='list-disc p-revert'>
                <li>Encrypted cloud storage (hosted on Australian-based infrastructure) </li>
                <li>Role-based access controls </li>
                <li>Regular security audits, threat detection, and MFA (Multi-Factor Authentication) for admin access </li>
              </ul>
              <p>We retain personal data only as long as necessary to fulfil services or meet legal obligations. </p>
            </li>
            <li className='pb-4'>
              <h3>Your Rights </h3>
              <p>Under the Australian Privacy Act 1988 and international equivalents (e.g. GDPR), you have the right to: </p>
              <ul className='list-disc p-revert'>
                <li>Access the personal information we hold </li>
                <li>Request corrections or deletion </li>
                <li>Withdraw consent (where applicable) </li>
                <li>Opt-out of marketing communications </li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) </li>
              </ul>
              <p>To exercise these rights, email us at: privacy@carreb.com.au </p>
            </li>
            <li className='pb-4'>
              <h3>AI and Automated Decision-Making </h3>
              <p>Carreb uses AI to calculate cost and emissions estimates, match users to vehicles, and optimise platform performance. These tools rely on public data, manufacturer specs, government sources, and user-entered preferences.</p>
              <p>Outputs are objective calculations only and are not legally binding advice. Users may request clarification on how such results are derived. </p>
            </li>
            <li className='pb-4'>
              <h3>Children </h3>
              <p>Carreb does not knowingly collect data from children under the age of 16. If we discover such data has been submitted, we will delete it promptly. </p>
            </li>
            <li className='pb-4'>
              <h3>Disclaimer </h3>
              <p>The information provided on Carreb.com is general in nature and does not constitute financial, legal, or personal advice. While we use real-world data and best-practice modelling to estimate cost of ownership, resale values, and emissions, all results are indicative only and may vary depending on personal circumstances, market conditions, and user inputs. </p>
              <p>Users should conduct their own research and seek professional advice where necessary before making a purchase decision. Carreb Pty Ltd does not accept liability for any decisions made based on the information provided. </p>
            </li>
            <li className='pb-4'>
              <h3>Changes to This Policy </h3>
              <p>This policy may be updated periodically. Material changes will be notified on our website. Continued use of the platform implies acceptance of revised terms. </p>
            </li>
            <li className='pb-4'>
              <h3>Contact </h3>
              <p>Email: <a href="mailto:privacy@carreb.com.au" title="Mail to privacy@carreb.com.au" className="underline hover:underline-offset-4">privacy@carreb.com.au </a><br/>
              To make a complaint or access your data, please contact us via email. </p>
            </li>
 
          </ol>
        </section>
      </div>
    </>
  )
}