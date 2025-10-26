import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

const VerificationEmail = (props: VerificationEmailProps) => {
  const { userName, verificationUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Verify your email address to complete your account setup
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome to NoteForge! Please confirm your email to get started.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hi {userName}!,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                Thank you for joining us, to activate your account and keep it
                secure, please verify your email address by clicking the button
                below.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[16px] mt-[16px]">
                <Button
                  href={verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn&#39;t work, you can also copy and
                paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-[24px] m-0 break-all">
                <Link
                  href={verificationUrl}
                  className="text-blue-600 underline"
                >
                  {verificationUrl}
                </Link>
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                This verification link will expire in 24 hours for security
                reasons. If you didn&#39;t create an account with us, you can
                safely ignore this email.
              </Text>

              <Text className="text-[16px] text-gray-700 m-0">
                Welcome aboard!
                <br />
                The NoteForge Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                NoteForge.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
