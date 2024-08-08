import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
  constructor() {}
  
   createBookingEmail(title: string, subtitle: string, description: string,date:string,price:number, location: string, picture:string, urlHome:string):string {
    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Booking Confirmation</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 2rem;
        padding: 3rem;
        }
        .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        overflow: visible;
        }
        .header {
        background-color: #022c6f;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        }
        .header img {
        width: 100px;
        height: auto;
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        }
        .header h1 {
        margin-top: 70px;
        font-size: 24px;
        margin: 0;
        }
        .content {
        padding: 20px;
        text-align: left;
        }
        .content h2 {
        color: #022c6f;
        }
        .footer {
        background-color: #eaeaea;
        color: #333333;
        text-align: center;
        padding: 20px;
        font-size: 12px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        }
        .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px auto;
        color: #ffffff;
        background-color: #00b0f0;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        }
        .button:hover {
        background-color: #005b9e;
        }
        .details {
        margin: 20px 0;
        }
        .details p {
        margin: 10px 0;
        }
        .details img {
        max-width: 100%;
        height: auto;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <img src="https://www.svgrepo.com/show/267163/chef.svg" alt="Logo">
        <h1>Event Purchase Confirmation</h1>
        </div>
        <div class="content">
        <h2>Thank you for your reservation!</h2>
        <p>We are excited to confirm your participation in the following event:</p>
        <div class="details">
            <p><strong><span ">${title}</span></strong></p>
            <p><strong><span >${subtitle}</span></strong></p>
            <p><span >${description}</span></p>
            <p><span >${date}</span></p>
            <p><strong>Location:</strong> <span >${location}</span></p>
            <p><strong>Price per Seat:</strong> <span >${price}</span></p>
            <p><img  src="${picture}" alt="Event Picture"></p>
        </div>
        <a href="${urlHome}" class="button">Back to Homepage</a>
        </div>
        <div class="footer">
        <p>&copy; 2024 Culinary Experiences. All rights reserved.</p>
        </div>
    </div>

    </body>
    </html>`
    return template
}
    createUserEmail(name:string,urlHome:string):string {
        let template = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 2rem;
            padding: 3rem;
            }
            .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 15px; 
            overflow: visible;
            }
            .header {
            background-color: #022c6f;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            position: relative;
            display: flex;
            justify-content: center; 
            align-items: center;     
            height: 120px; 
            border-top-left-radius: 15px; 
            border-top-right-radius: 15px;
            }
            .header img {
            width: 100px;
            height: auto;
            position: absolute;
            top: -50px; 
            left: 50%;
            transform: translateX(-50%);
            }
            .header h1 {
            margin-top: 70px; 
            font-size: 24px;
            margin: 0; 
            }
            .content {
            padding: 20px;
            text-align: left;
            }
            .footer {
            background-color: #eaeaea;
            color: #333333;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            border-bottom-left-radius: 15px; 
            border-bottom-right-radius: 15px;
            }
            .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px auto;
            color: #ffffff;
            background-color: #00b0f0;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            }
            .button:hover {
            background-color: #005b9e;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <img src="https://www.svgrepo.com/show/267163/chef.svg" alt="Logo">
            <h1>Registration Successful!</h1>
            </div>
            <div class="content">
            <p>Hello, ${name}</p>
            <p>Thank you for registering on my platform.</p>
            <p>Log in to the page to find the experience that best suits your tastes.</p>
            <a href="${urlHome}" class="button">Gourmet Affair</a>
            <p>If you have any questions, please feel free to contact us.</p>
            <p>Hope to see you soon!</p>
            </div>
            <div class="footer">
            <p>&copy; 2024 Gourmet Affair. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>`
        return template
    }
}