import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send(recipient, link):
    # if __name__ == "__main__":
    email = ''
    password = os.environ.get("PASSWORD")

    dest_email = recipient

    message = MIMEMultipart()
    message["From"] = email
    message["To"] = dest_email
    message["Subject"] = "Link"
    # message["Bcc"] = dest_email

    # msg = "Click here to follow the link https://stackoverflow.com/questions/1546367/python-how-to-send-mail-with-to-cc-and-bcc"
    html = """
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
                            <p><a href="{}" target="_blank"> Click here to follow the link </a></p>
                            <p>If you couldn't follow the link then copy it: {}</p>
                        </div>
                    </body>
            </html> """.format(link, link)

    # part1 = MIMEText(msg, 'plain')
    part2 = MIMEText(html, 'html')

    # message.attach(part1)
    message.attach(part2)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()

    server.set_debuglevel(1)
    server.login(email, password)
    # server.auth_plain()
    server.sendmail(email, dest_email, message.as_string())
    server.quit()
    # print(message.as_string())


for attempt in range(1):
    try:
        send(recipient='', link="")
    except Exception as e:
        print("Error sending mail", str(e))
exit(0)
