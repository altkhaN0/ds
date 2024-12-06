<script>
  document.addEventListener("DOMContentLoaded", function() {
    const userAuthKey = "{{ settings.auth_key }}"; // Shopify ayarlarından gelen Auth Key

    // Key formatını doğrulayan regex deseni
    const keyPattern = /^DS-\w{4}-\w{4}-\w{4}$/;

    // Auth key'in boş olmaması gerektiğini kontrol et ve tırnak işareti içerip içermediğini kontrol et
    if (!userAuthKey || userAuthKey.trim() === "" || userAuthKey.includes('"')) {
      document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Auth Key cannot be empty or contain quotes. Please enter a valid Auth Key.</div>";
      return; // Eğer boşsa veya tırnak içeriyorsa işlemi durdur
    }

    // Key'in formatının uygun olup olmadığını kontrol et
    if (!keyPattern.test(userAuthKey)) {
      document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key format (e.g., DS-XXXX-XXXX-XXXX).</div>";
      return; // Doğrulama başarısızsa geri döner
    }

    // allowlist.json dosyasını fetch ile al
    fetch('https://raw.githubusercontent.com/altkhaN0/ds/refs/heads/main/allowlist.js')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load the auth list.");
        }
        return response.json();
      })
      .then(allowlist => {
        // Auth key, allowlist.json'daki keys içinde mi kontrol et
        if (!allowlist.keys.includes(userAuthKey)) {
          document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key for theme usage.</div>";
        } else {
          console.log("Authentication successful. Theme is active.");
          // Tema aktifse bir aksiyon ekleyebilirsin
        }
      })
      .catch(error => {
        document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>An error occurred. Please try again later.</div>";
        console.error("Error:", error);
      });
  });
</script>
