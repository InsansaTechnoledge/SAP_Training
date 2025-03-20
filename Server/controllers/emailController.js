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

export const sendPaymentMail=async(req,res)=>{
    const {formData,paymentInvoice}=req.body;
    try{
        const mailOptions={
            from:process.env.EMAIL,
            to:formData.email,
            subject:'Payment Invoice',
            text:`Dear ${formData.fullName},\n\nThank you for purchasing the course. Please find the attached invoice for the payment.\n\nRegards,\n<p><a href="" target="_blank">Attainment</a></p>
            <p><b>"<a href="https://insansa.com/" target="_blank">Insansa Techknowledge Pvt. Ltd.</b></p>
        <p>+91 9724379123 | 0265-4611836</p>\n`,
        }
    }catch(error){}

}