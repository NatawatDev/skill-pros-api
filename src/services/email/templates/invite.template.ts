export const inviteTemplate = (name: string, inviteLink: string): string => `
<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <title>You're invited to Skill Pros</title>
  </head>
  <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <!-- Header with logo -->
            <tr style="background-color: #ffffff;">
              <td style="padding: 24px 40px; display: flex; align-items: center;">
                <img src="https://s3-alpha.figma.com/profile/93147ab7-fa2e-4364-aefc-a9a1b90dc017" alt="Skill Pros Logo" width="36" style="vertical-align: middle;" />
                <span style="font-size: 20px; font-weight: bold; margin-left: 10px; color: #222;">Skill Pros</span>
              </td>
            </tr>

            <!-- Body content -->
            <tr>
              <td style="padding: 30px 40px;">
                <h2 style="color: #222;">You’ve been invited to Skill Pros Administrator</h2>
                

                <p style="font-size: 16px; color: #333;"><strong>Hi ${name},</strong></p>
                <p style="font-size: 15px; color: #444;">
                  You are invited to be an Admin in Skill Pros Administrator.
                  <a href="${inviteLink}" style="color: #3056D3; text-decoration: none;">Please setup your account within 24 hours.</a> Click the button below to start.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a
                    href="${inviteLink}"
                    style="background-color: #3056D3; padding: 14px 28px; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px;"
                  >
                    Set up your account
                  </a>
                </div>

                <p style="font-size: 14px; color: #666;">
                  If the button above doesn't work, copy and paste this link into your browser:
                </p>
                <p style="font-size: 13px; color: #999;">
                  <a href="${inviteLink}" style="color: #3056D3;">${inviteLink}</a>
                </p>
                
                <p style="font-size: 13px; color: #999; margin-top: 40px;">
                  If you didn’t request this, please ignore this email.
                </p>

                <p style="font-size: 13px; color: #999; margin-top: 20px;">
                  Thank you,<br />Skill Pros Team
                </p>
                <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align: center; padding: 20px; font-size: 12px; color: #aaa;">
                Copyright 2025 Skill Pros, All Rights Reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
