document.addEventListener("DOMContentLoaded", function() {
  const userAuthKey = "{{ settings.auth_key }}".trim(); // Shopify ayarlarından gelen Auth Key

  // Key formatını doğrulayan regex deseni
  const keyPattern = /^DS-\d{4}-\d{4}$/;

  // Key'in formatının uygun olup olmadığını kontrol et
  if (!keyPattern.test(userAuthKey)) {
      document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key format (e.g., DS-XXXX-XXXX).</div>";
      console.error("Invalid Auth Key format.");
      return; // Doğrulama başarısızsa geri döner
  }

  // Allowlist URL'sini fetch ile al
  fetch('https://cdn.jsdelivr.net/gh/altkhaN0/ds@main/allowlist.json')
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to load the auth list.");
          }
          return response.json();
      })
      .then(allowlist => {
          console.log("Allowlist verisi:", allowlist);  // Debug: allowlist verisini yazdır

          if (!allowlist.includes(userAuthKey)) {
              document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key for theme usage.</div>";
              console.warn("Auth Key not found in the allowlist.");
          } else {
              document.body.innerHTML = "<div style='padding: 20px; text-align: center;'>Theme is now activated!</div>";
              console.log("Auth Key is valid.");

              // Geçici mesajdan sonra ana temayı aktifleştir
              setTimeout(() => {
                  document.body.innerHTML = ''; // Ana içeriği aktive etmek için temizleyebiliriz
              }, 3000); // 3 saniye sonra mesaj kaybolacak
          }
      })
      .catch(error => {
          document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>An error occurred. Please try again later.</div>";
          console.error("Error:", error);
      });
});
