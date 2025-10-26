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

interface PasswordResetEmailProps {
  userName: string;
  userEmail: string;
  resetUrl: string;
  expirationTime: string;
}

const PasswordResetEmail = (props: PasswordResetEmailProps) => {
  const { userName, userEmail, resetUrl, expirationTime } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hello {userName},
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                We received a request to reset the password for your account
                associated with <strong>{userEmail}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                If you made this request, click the button below to reset your
                password:
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[16px] mt-[16px]">
                <Button
                  href={resetUrl}
                  className="bg-red-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn&#39;t work, you can also copy and
                paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-[32px] m-0 break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>

              {/* Security Information */}
              <Section className="bg-yellow-50 border border-yellow-200 rounded-[8px] p-[20px] mb-[24px]">
                <Text className="text-[14px] text-yellow-800 font-medium mb-[8px] m-0">
                  ⚠️ Important Security Information
                </Text>
                <Text className="text-[14px] text-yellow-700 mb-[8px] m-0">
                  • This password reset link will expire in {expirationTime}
                </Text>
                <Text className="text-[14px] text-yellow-700 mb-[8px] m-0">
                  • If you didn&#39;t request this reset, please ignore this
                  email
                </Text>
                <Text className="text-[14px] text-yellow-700 m-0">
                  • Your password will remain unchanged until you create a new
                  one
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                If you didn&#39;t request a password reset, you can safely
                ignore this email. Your account remains secure and no changes
                have been made.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                If you&#39;re having trouble or didn&#39;t request this change,
                please contact our support team immediately.
              </Text>

              <Text className="text-[16px] text-gray-700 m-0">
                Best regards,
                <br />
                The NoteForge Security Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                NoteForge
              </Text>

              <Text className="text-[12px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()} All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
