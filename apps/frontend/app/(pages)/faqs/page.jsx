export const metadata = {
  title: "Frequently Asked Questions | Messia",
  description:
    "Find answers to common questions about Messia, orders, shipping, returns, and more.",
};
export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: December 2025
        </p>
        <div className="mt-8 space-y-12 text-sm leading-relaxed sm:text-base">
          {}
          <section>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Orders &amp; Shipping
            </h2>
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  How do I track my order?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Once your order has shipped, you will receive an email with a
                  tracking number and a link to track your package. You can also
                  view your order status in your account dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Do you ship internationally?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Yes, we ship to select countries worldwide. Shipping costs and
                  delivery times vary depending on the destination. You can see
                  available shipping options at checkout.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Can I change or cancel my order?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We process orders quickly to ensure fast delivery. If you need
                  to make changes, please contact our support team within 1 hour
                  of placing your order. We cannot guarantee changes after this
                  window.
                </p>
              </div>
            </div>
          </section>
          {}
          <section>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Returns &amp; Refunds
            </h2>
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  What is your return policy?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We accept returns within 30 days of delivery for most items in
                  new, unused condition. Please visit our Returns Center to
                  initiate a return.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  How long do refunds take?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Once we receive and inspect your return, we will process your
                  refund within 5-7 business days. It may take additional time
                  for your bank to post the funds to your account.
                </p>
              </div>
            </div>
          </section>
          {}
          <section>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Account &amp; Payments
            </h2>
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">
                  What payment methods do you accept?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We accept major credit cards (Visa, MasterCard, Amex), PayPal,
                  and Apple Pay. All transactions are secure and encrypted.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  I forgot my password. What should I do?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Click on &quot;Forgot Password&quot; on the login page and
                  follow the instructions to reset your password via email.
                </p>
              </div>
            </div>
          </section>
          {}
          <section>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Still have questions?
            </h2>
            <p className="mt-3">
              If you couldn&apos;t find the answer you were looking for, please
              contact our support team.
            </p>
            <p className="mt-2 font-semibold">support@messia.app</p>
          </section>
        </div>
      </section>
    </main>
  );
}
