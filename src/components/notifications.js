export async function sendEmailNotification(to, subject, body) {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/notify/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, body }),
      });
  
      const data = await res.json();
      console.log("📨 Backend response:", data);
  
      if (res.ok) {
        console.log("✅ Email sent successfully from frontend");
        return true;
      } else {
        console.error("❌ Failed to send email:", data);
        return false;
      }
    } catch (err) {
      console.error("🚨 Error sending email:", err);
      return false;
    }
  }
  