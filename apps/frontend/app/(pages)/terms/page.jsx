export const metadata = {
  title: "Terms of Service | Messia",
  description:
    "Read the Terms of Service for Messia to understand the rules and regulations for using our website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: December 2025
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed sm:text-base">
          <p>
            Welcome to <span className="font-semibold">Messia</span>! These
            Terms of Service (&quot;Terms&quot;) govern your use of our website,
            mobile application, and services (collectively, the
            &quot;Service&quot;). By accessing or using our Service, you agree
            to be bound by these Terms. If you do not agree to these Terms,
            please do not use our Service.
          </p>

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By creating an account or using any part of the Service, you
              represent that you are at least the age of majority in your
              jurisdiction and have the legal capacity to enter into this
              agreement.
            </p>
          </section>

          {/* 2. User Accounts */}
          <section>
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="mt-3">
              To access certain features, you may need to register for an
              account. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur
              under your account. You agree to notify us immediately of any
              unauthorized use of your account.
            </p>
          </section>

          {/* 3. Products and Services */}
          <section>
            <h2 className="text-xl font-semibold">3. Products and Services</h2>
            <p className="mt-3">
              We make every effort to display as accurately as possible the
              colors, features, specifications, and details of the products
              available on the Service. However, we do not guarantee that the
              colors, features, specifications, and details of the products will
              be accurate, complete, reliable, current, or free of other errors,
              and your electronic display may not accurately reflect the actual
              colors and details of the products.
            </p>
            <p className="mt-3">
              All products are subject to availability, and we cannot guarantee
              that items will be in stock. We reserve the right to discontinue
              any products at any time for any reason. Prices for all products
              are subject to change.
            </p>
          </section>

          {/* 4. Purchases and Payment */}
          <section>
            <h2 className="text-xl font-semibold">4. Purchases and Payment</h2>
            <p className="mt-3">
              You agree to provide current, complete, and accurate purchase and
              account information for all purchases made via the Service. You
              further agree to promptly update your account and payment
              information, including email address, payment method, and payment
              card expiration date, so that we can complete your transactions
              and contact you as needed.
            </p>
          </section>

          {/* 5. Prohibited Activities */}
          <section>
            <h2 className="text-xl font-semibold">5. Prohibited Activities</h2>
            <p className="mt-3">
              You may not access or use the Service for any purpose other than
              that for which we make the Service available. The Service may not
              be used in connection with any commercial endeavors except those
              that are specifically endorsed or approved by us.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Systematically retrieve data or other content from the Service
                to create or compile, directly or indirectly, a collection,
                compilation, database, or directory without written permission
                from us.
              </li>
              <li>
                Make any unauthorized use of the Service, including collecting
                usernames and/or email addresses of users by electronic or other
                means for the purpose of sending unsolicited email.
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with
                security-related features of the Service.
              </li>
              <li>
                Engage in unauthorized framing of or linking to the Service.
              </li>
            </ul>
          </section>

          {/* 6. Intellectual Property Rights */}
          <section>
            <h2 className="text-xl font-semibold">
              6. Intellectual Property Rights
            </h2>
            <p className="mt-3">
              Unless otherwise indicated, the Service is our proprietary
              property and all source code, databases, functionality, software,
              website designs, audio, video, text, photographs, and graphics on
              the Service (collectively, the &quot;Content&quot;) and the
              trademarks, service marks, and logos contained therein (the
              &quot;Marks&quot;) are owned or controlled by us or licensed to
              us, and are protected by copyright and trademark laws.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold">
              7. Limitation of Liability
            </h2>
            <p className="mt-3">
              In no event will we or our directors, employees, or agents be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive
              damages, including lost profit, lost revenue, loss of data, or
              other damages arising from your use of the Service, even if we
              have been advised of the possibility of such damages.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold">8. Governing Law</h2>
            <p className="mt-3">
              These Terms shall be governed by and defined following the laws of
              [Your Country/State]. Messia and yourself irrevocably consent that
              the courts of [Your Country/State] shall have exclusive
              jurisdiction to resolve any dispute which may arise in connection
              with these terms.
            </p>
          </section>

          {/* 9. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right, in our sole discretion, to make changes or
              modifications to these Terms at any time and for any reason. We
              will alert you about any changes by updating the &quot;Last
              updated&quot; date of these Terms, and you waive any right to
              receive specific notice of each such change.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section>
            <h2 className="text-xl font-semibold">10. Contact Us</h2>
            <p className="mt-3">
              In order to resolve a complaint regarding the Service or to
              receive further information regarding use of the Service, please
              contact us at:
            </p>
            <p className="mt-2 font-semibold">support@messia.app</p>
          </section>
        </div>
      </section>
    </main>
  );
}
