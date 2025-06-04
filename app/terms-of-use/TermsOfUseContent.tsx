import React from 'react';
import Image from 'next/image';
import Head from 'next/head';


export default function TermsOfUseContent() {
  return (
    <>
      <Head>
        <title>Carreb - Terms of Use</title>
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
              <h1 className="text-4xl font-bold">Terms of Use</h1>
            </div>
          </div>
        </div>
        <section className="container pt-8 pb-8">
          <ol className='list-decimal p-revert'>
            <li className='pb-4'>
              <h3>Introduction</h3>
              <p>Welcome to Carreb. These Terms of Use govern your access to and use of the Carreb website, including any content, features, tools, and services provided through it. By accessing or using the site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the website.</p>
            </li>
            <li className='pb-4'>
              <h3>Intellectual Property </h3>
              <p>All content on this website, including the CORE™ Rating, Smart Finder outputs, text, graphics, and software, is the intellectual property of Carreb or its licensors, and is protected under applicable copyright, trademark, and other intellectual property laws. Users are granted a limited, non-transferable, and non-exclusive license to access and use the site for personal, non-commercial purposes only. </p>
            </li>
            <li className='pb-4'>
              <h3>Use of Data and Content </h3>
              <p>The data presented by Carreb is derived from publicly available sources, government data, and manufacturer specifications. Carreb aggregates, models, and presents this information using proprietary algorithms and third-party data processors for educational and informational use only. </p>
            </li>
            <li className='pb-4'>
              <h3>Third-Party References, Data Use, and Liability Waiver </h3>
              <p>Carreb uses data obtained from publicly accessible sources, including but not limited to manufacturer-published vehicle specifications, trusted government platforms, and internationally accepted emissions and sustainability benchmarks. Carreb does not alter or fabricate such data but instead performs independent, factual calculations to present it in a simplified, user-focused format for the purposes of consumer education and decision support. </p>
              <p>Unless explicitly stated, Carreb is not affiliated with, sponsored by, or endorsed by any car manufacturer, dealership, marketplace, or comparison platform. Any references to third-party products, brands, or entities are for identification purposes only and do not imply any partnership, endorsement, or commercial relationship.  </p>
              <p>Carreb does not offer subjective reviews, opinions, or value judgments regarding any particular vehicle brand, model, or vendor. All outputs — including the CORE™ Rating, Cost of Ownership (COO) summaries, and CO₂ impact assessments — are presented as factual calculations based on defined algorithms, public data, and standardised economic and environmental modelling. These are not intended, nor should they be construed, as defamatory, misleading, or commercially prejudicial. </p>
              <p>The presentation of CORE™ Ratings and other outputs on Carreb's platform is done in the public interest, to support informed consumer decision-making in relation to cost-of-living, environmental impact, and sustainability. As such, Carreb asserts its rights under relevant Australian and international fair use, freedom of expression, and consumer information laws. </p>
              <p>By using this site, all users, entities, and third-party stakeholders acknowledge and accept that Carreb shall not be liable for any alleged commercial harm, reputational damage, or economic loss arising from the publication of fact-based vehicle comparisons or data outputs unless proven to be maliciously false, materially incorrect, and published with intent to cause harm — the burden of proof for which rests solely on the complainant. </p>
            </li>
            <li className='pb-4'>
              <h3>Disclaimer on Consumer and Business Decisions </h3>
              <p>Carreb provides information and calculated metrics such as the CORE™ Rating, Cost of Ownership estimates, CO₂ impact modelling and Estimated savings solely for general information purposes. These outputs are derived using proprietary algorithms and models that incorporate publicly available specifications, manufacturer data, industry research, government datasets, user-provided inputs, and certain economic and usage assumptions. </p>
              <p>While Carreb aims to provide information that is accurate and useful, the figures and outputs on the site are indicative only. They do not constitute financial, environmental, or legal advice, and must not be relied upon as a substitute for personal or professional consultation. Vehicle ownership costs and emissions performance may vary significantly based on driving behaviour, geography, fuel price fluctuations, insurer discretion, vehicle usage patterns, or unlisted factors. </p>
              <p>Carreb accepts no responsibility or liability for any vehicle purchase, lease, financial commitment, investment decision, or business transaction undertaken by a user based in whole or in part on the outputs or tools provided through the Carreb platform. All users acknowledge and accept full responsibility for their vehicle-related choices. </p>
            </li>
            <li className='pb-4'>
              <h3>AI-Assisted Data Sources and Limitations </h3>
              <p>Carreb's platform may incorporate outputs generated through AI-assisted tools, including AI-enhanced data retrieval or summarisation from third-party public sources. While efforts are made to validate information used in our CORE™ Rating and cost estimates, AI-generated content may occasionally reflect outdated, incorrect, or contextually inaccurate data. </p>
              <p>Carreb does not warrant the absolute accuracy or completeness of AI-assisted results and disclaims all liability arising from reliance on such content. Users are encouraged to independently verify key information where critical to their vehicle-related decisions. </p>
            </li>
            <li className='pb-4'>
              <h3>User Conduct </h3>
              <p>Users must not use this site to upload or distribute any material that is defamatory, obscene, infringing, or unlawful. Any unauthorised access, scraping, or reverse-engineering of Carreb's proprietary systems or datasets is strictly prohibited. </p>
            </li>
            <li className='pb-4'>
              <h3>Disclaimers </h3>
              <p>Carreb provides all information on an 'as is' basis. While we strive to maintain accuracy, we make no warranties as to the completeness or correctness of the content. Vehicle specifications, cost assumptions, and environmental metrics may vary based on region, updates, and user-specific factors. </p>
            </li>
            <li className='pb-4'>
              <h3>Limitation of Liability </h3>
              <p>To the fullest extent permitted by law, Carreb disclaims all liability for any loss, damage, or inconvenience arising from reliance on the information provided on this site. </p>
            </li>
            <li className='pb-4'>
              <h3>Governing Law </h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of Queensland, Australia. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Queensland. </p>
            </li>
            <li className='pb-4'>
              <h3>Australian Consumer Law Notice </h3>
              <p>Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or remedy conferred by the Australian Consumer Law that cannot be excluded, restricted or modified by agreement. Where permitted, Carreb limits its liability in relation to such guarantees to supplying the services again or paying the cost of having them supplied again. </p>
            </li>
            <li className='pb-4'>
              <h3>No Duty of Care </h3>
              <p>Carreb provides its platform and information on an 'as is' and 'as available' basis. To the maximum extent permitted by law, Carreb disclaims any duty of care or fiduciary responsibility to users, customers, or third parties. Use of the site and reliance on its outputs are entirely at the user's own discretion and risk. </p>
            </li>
            <li className='pb-4'>
              <h3>Class Action Waiver </h3>
              <p>All users agree that any claims, disputes, or legal proceedings arising from or related to use of this site shall be brought solely in an individual capacity. No claim may be pursued or maintained as part of a class action, representative action, or collective proceeding without the prior written consent of Carreb. </p>
            </li>
            <li className='pb-4'>
              <h3>Platform Evolution and Output Modifications </h3>
              <p>Carreb reserves the right to update, revise, or recalibrate any data inputs, modelling methodologies, scoring systems (including CORE™ Ratings), or displayed outputs at any time, without prior notice, in response to new information, user feedback, regulatory shifts, or improvements in data science or algorithmic performance. </p>
              <p>Carreb is not a car dealership, lender, or broker. It does not sell vehicles, offer finance, or receive commission from third-party sales. Carreb provides data-driven tools and insights to help users assess vehicle cost-of-ownership, CO₂ impact, and potential savings using a freemium-access model. Basic features are available at no cost, while advanced features may require subscription access. Pricing and service tiers are subject to change. </p>
              <p>Users agree to provide accurate and current information when using the platform, particularly when entering vehicle preferences, usage, and financial parameters. Inaccurate inputs may materially affect calculated outputs, and Carreb accepts no responsibility for decisions made based on erroneous or incomplete user data. </p>
              <p>While Carreb strives to ensure all estimates are based on reliable sources and up-to-date methods, we do not guarantee the accuracy of resale values, fuel or electricity pricing, tax rebates, or emission regulations. Such figures are indicative only and should not be relied upon as financial advice or guarantees of future performance. </p>
            </li>
          </ol>
        </section>
      </div>
    </>
  )
}