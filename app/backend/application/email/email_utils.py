import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def build_message(sender_email_address: str,
                  recipient_email_address: str,
                  email_subject: str,
                  email_html_body: str) -> MIMEMultipart:
    message = MIMEMultipart()
    message["From"] = sender_email_address
    message["To"] = recipient_email_address
    message["Subject"] = email_subject
    message.attach(MIMEText(email_html_body, "html"))
    return message


def send_email(sender_email_address: str,
               sender_email_password: str,
               recipient_email_address: str,
               email_subject: str,
               email_html_body: str,
               smtp_server_host: str,
               smtp_server_port: int):
    message = build_message(sender_email_address, recipient_email_address, email_subject, email_html_body)
    server = smtplib.SMTP(smtp_server_host, smtp_server_port)
    server.ehlo()
    server.starttls()
    server.login(sender_email_address, sender_email_password)
    server.sendmail(sender_email_address, recipient_email_address, message.as_string())
    server.quit()


def html_email(link: str) -> str:
    return """
<html>
  <head>
    <meta charset=UTF-8">
      <style>
        body {{
          background-color: #ffffff;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }}
        div {{
          background-color: #ffffff;
          width: 100%;
        }}
      </style>
  </head>
  <body>
    <div>
      <p><a href="{}" target="_blank"> Click here to follow the link.</a></p>
      <p>If you couldn't follow the link then just copy it: {}</p>
    </div>
  </body>
</html>
""".format(link, link)
