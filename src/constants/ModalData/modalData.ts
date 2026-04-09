// constants/ModalData/modalData.ts

// ✅ Export the type
export type ModalType = "terms" | "privacy" | "info";

export interface ModalContent {
  title: string;
  type: ModalType;
  content: string;
}

export const termsData: ModalContent = {
  title: "Terms of Service",
  type: "terms",
  content: `
    Welcome to our App! These Terms of Service govern your use of our mobile application.

    1. Acceptance of Terms
    By downloading, accessing, or using our App, you agree to be bound by these Terms.

    2. User Accounts
    You are responsible for maintaining the confidentiality of your account credentials.
    You agree to accept responsibility for all activities that occur under your account.

    3. Content Usage
    All content provided in this App is for informational purposes only.
    You may not copy, distribute, or modify any content without prior written consent.

    4. Prohibited Activities
    You agree not to:
    - Use the App for any illegal purpose
    - Attempt to gain unauthorized access to our systems
    - Interfere with the proper working of the App
    - Bypass any security features

    5. Termination
    We reserve the right to terminate or suspend your account immediately,
    without prior notice, for conduct that violates these Terms.

    6. Limitation of Liability
    To the fullest extent permitted by law, we shall not be liable for any
    indirect, incidental, special, consequential, or punitive damages.

    7. Changes to Terms
    We reserve the right to modify these Terms at any time.
    Your continued use of the App constitutes acceptance of the modified Terms.

    8. Contact Us
    If you have any questions about these Terms, please contact us at:
    support@yourapp.com
  `,
};

export const privacyData: ModalContent = {
  title: "Privacy Policy",
  type: "privacy",
  content: `
    This Privacy Policy explains how we collect, use, and protect your personal information.

    1. Information We Collect
    - Personal Information: Name, email address, phone number
    - Usage Data: App interactions, features used, time spent
    - Device Information: Device model, OS version, unique identifiers

    2. How We Use Your Information
    - To provide and maintain our App services
    - To notify you about changes to our App
    - To provide customer support
    - To gather analysis to improve our App
    - To monitor usage of our App

    3. Data Storage and Security
    We implement appropriate technical and organizational measures to protect
    your personal information against unauthorized access, alteration, disclosure,
    or destruction.

    4. Third-Party Services
    We may employ third-party companies and individuals to facilitate our App,
    provide services on our behalf, or assist us in analyzing how our App is used.

    5. Your Rights
    You have the right to:
    - Access your personal information
    - Correct inaccurate information
    - Request deletion of your data
    - Opt-out of marketing communications

    6. Children's Privacy
    Our App is not intended for children under 13 years of age.
    We do not knowingly collect personal information from children under 13.

    7. Changes to Privacy Policy
    We may update our Privacy Policy from time to time.
    We will notify you of any changes by posting the new Privacy Policy on this page.

    8. Contact Us
    If you have any questions about this Privacy Policy, please contact us:
    privacy@yourapp.com
  `,
};
