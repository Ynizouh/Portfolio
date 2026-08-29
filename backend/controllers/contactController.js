const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs." });
  }

  try {
    // Configuration du transporteur Nodemailer (Gmail comme "facteur")
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // L'adresse Gmail
        pass: process.env.EMAIL_PASS, // Le mot de passe d'application Gmail
      },
    });

    // Options de l'email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Obligatoire avec Gmail
      to: "mathissaint-leger@laposte.net",   // 👈 L'adresse où tu VEUX RECEVOIR les messages
      replyTo: email,               // Pour que tu puisses faire "Répondre" directement à la personne
      subject: `Nouveau message Portfolio de ${name}`,
      text: `Vous avez reçu un nouveau message depuis votre portfolio.\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Nouveau message du Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
        </div>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Votre message a été envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'envoi du message." });
  }
};
