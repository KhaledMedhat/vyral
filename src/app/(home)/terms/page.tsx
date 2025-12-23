export default function TermsPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 1, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using Vyral, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our
            service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vyral provides a messaging platform that allows users to send text messages, images, files, and make voice and video calls. Our service is
            available on web, iOS, and Android platforms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">To use Vyral, you must create an account. You are responsible for:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and complete information</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Use the service for any illegal purpose</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Send spam or unsolicited messages</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper working of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Vyral service, including all content, features, and functionality, is owned by Vyral and protected by copyright, trademark, and other
            intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account at any time for violations of these terms. You may also delete your account at any time through
            the app settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@Vyral.chat" className="text-accent hover:underline">
              legal@Vyral.chat
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
