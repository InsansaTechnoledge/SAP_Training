import nodemailer from 'nodemailer';

export const transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass:process.env.PASSWORD,
    }
});

transporter.verify((error)=>{
    if(error){
        console.error('Error configuringtransporter',error);

    }else{
        console.log('Transporter is configured and ready to send Emails.');
    }
});

const createInvoice=async(formData,payment,checkoutData)=>{
    const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Create invoice HTML
        const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h2 { color: #007bff; }
                    .invoice-box { border: 1px solid #ddd; padding: 15px; max-width: 500px; }
                    p { margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="invoice-box">
                    <h2>Invoice</h2>
                    <p><strong>Customer:</strong> ${formData.fullName}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Course:</strong> ${checkoutData.cart.map((item)=>(
                        `<p>${item.title}</p>`
                    ))}</p>
                    <p><strong>Invoice ID:</strong> ${formData.receipt}</p>
                    <p><strong>Amount:</strong> $${formData.amount}</p>
                    <p><strong>Date:</strong> ${Date.now()}</p>
                    <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
                </div>
            </body>
        </html>`;

        // Set page content and generate PDF
        await page.setContent(htmlContent, { waitUntil: "load" });
        const pdfBuffer = await page.pdf({ format: "A4" });
        await browser.close();
        console.log("PDF generated successfully");
        console.log(pdfBuffer);
        return pdfBuffer;
};
export const sendPaymentMail=async(req,res)=>{
    const {formData,payment,checkoutData}=req.body;
    try{
        const mailOptions = {
            from: process.env.EMAIL,
            to: formData.email,
            subject: "Payment Invoice",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p>Dear <strong>${formData.fullName}</strong>,</p>
                    
                    <p>Thank you for purchasing the course. Please find the attached invoice for your payment.</p>
                    
                    <p>For any queries, feel free to contact us.</p>
                    
                    <br>
                    <p>Regards,</p>
                    <p><a href="https://insansa.com/" target="_blank" style="color: #007bff; text-decoration: none;"><strong>Attainment</strong></a></p>
        
                    <p><b><a href="https://insansa.com/" target="_blank" style="color: #007bff; text-decoration: none;">Insansa Techknowledge Pvt. Ltd.</a></b></p>
                    
                    <p>📞 +91 9724379123 | 0265-4611836</p>
                </div>
            `,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: createInvoice(formData,payment,checkoutData),  // Attach the dynamically generated PDF invoice
                    contentType: "application/pdf",
                },
            ],
        };
        res.status(200).json({message:"Email sent successfully"});
    }catch(error){}

}