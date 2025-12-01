export const metadata = {
  title: "Cookie Policy | Messia",
  description:
    "Learn about how Messia uses cookies and similar technologies to improve your experience.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: December 2025
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed sm:text-base">
          <p>
            This Cookie Policy explains how{" "}
            <span className="font-semibold">Messia</span> (&quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) uses cookies and similar
            technologies to recognize you when you visit our website or use our
            app. It explains what these technologies are and why we use them, as
            well as your rights to control our use of them.
          </p>

          {/* 1. What are cookies? */}
          <section>
            <h2 className="text-xl font-semibold">1. What are cookies?</h2>
            <p className="mt-3">
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </p>
          </section>

          {/* 2. Why do we use cookies? */}
          <section>
            <h2 className="text-xl font-semibold">2. Why do we use cookies?</h2>
            <p className="mt-3">
              We use first-party and third-party cookies for several reasons.
              Some cookies are required for technical reasons in order for our
              Service to operate, and we refer to these as &quot;essential&quot;
              or &quot;strictly necessary&quot; cookies. Other cookies also
              enable us to track and target the interests of our users to
              enhance the experience on our Service.
            </p>
          </section>

          {/* 3. Types of Cookies */}
          <section>
            <h2 className="text-xl font-semibold">
              3. Types of Cookies We Use
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">Essential Cookies:</span> These
                are strictly necessary to provide you with services available
                through our Service and to use some of its features, such as
                access to secure areas.
              </li>
              <li>
                <span className="font-semibold">
                  Performance &amp; Functionality Cookies:
                </span>{" "}
                These are used to enhance the performance and functionality of
                our Service but are non-essential to their use. However, without
                these cookies, certain functionality may become unavailable.
              </li>
              <li>
                <span className="font-semibold">
                  Analytics &amp; Customization Cookies:
                </span>{" "}
                These collect information that is used either in aggregate form
                to help us understand how our Service is being used or how
                effective our marketing campaigns are, or to help us customize
                our Service for you.
              </li>
              <li>
                <span className="font-semibold">Advertising Cookies:</span>{" "}
                These are used to make advertising messages more relevant to
                you. They perform functions like preventing the same ad from
                continuously reappearing, ensuring that ads are properly
                displayed for advertisers, and in some cases selecting
                advertisements that are based on your interests.
              </li>
            </ul>
          </section>

          {/* 4. How can I control cookies? */}
          <section>
            <h2 className="text-xl font-semibold">
              4. How can I control cookies?
            </h2>
            <p className="mt-3">
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              the Cookie Consent Manager. In addition, most web browsers allow
              you to control cookies through their settings preferences.
            </p>
            <p className="mt-3">
              If you choose to reject cookies, you may still use our website
              though your access to some functionality and areas of our website
              may be restricted.
            </p>
          </section>

          {/* 5. Updates to this policy */}
          <section>
            <h2 className="text-xl font-semibold">5. Updates to this Policy</h2>
            <p className="mt-3">
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal, or regulatory reasons. Please therefore
              re-visit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
          </section>

          {/* 6. Contact */}
          <section>
            <h2 className="text-xl font-semibold">6. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about our use of cookies or other
              technologies, please email us at:
            </p>
            <p className="mt-2 font-semibold">support@messia.app</p>
          </section>
        </div>
      </section>
    </main>
  );
}
