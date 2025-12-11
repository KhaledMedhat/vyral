export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 1, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            At PAO, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you use our messaging application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Account information (email, username, profile picture)</li>
            <li>Messages and content you send through our service</li>
            <li>Contact information you choose to sync</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">End-to-End Encryption</h2>
          <p className="text-muted-foreground leading-relaxed">
            All messages sent through PAO are protected by end-to-end encryption. This means only you and the person you're communicating with can
            read your messages. We cannot read your messages, and neither can anyone else.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Detect and prevent fraud and abuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your information for as long as your account is active or as needed to provide you services. You can delete your account at any
            time, which will remove all your data from our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@pao.chat" className="text-accent hover:underline">
              privacy@pao.chat
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
