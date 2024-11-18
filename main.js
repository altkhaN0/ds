  <script>
  document.addEventListener("DOMContentLoaded", function() {
    const userAuthKey = "{{ settings.auth_key }}"; // Shopify ayarlarından gelen Auth Key

    // Key formatını doğrulayan regex deseni
    const keyPattern = /^DS-\d{4}-\d{4}$/;

    // Key'in formatının uygun olup olmadığını kontrol et
    if (!keyPattern.test(userAuthKey)) {
document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key format (e.g., DS-XXXX-XXXX).</div>";
      return; // Doğrulama başarısızsa geri döner
    }

fetch('https://raw.githubusercontent.com/altkhaN0/ds/refs/heads/main/allowlist.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load the auth list.");
        }
        return response.json();
      })
      .then(allowlist => {
        if (!allowlist.includes(userAuthKey)) {
          document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key for theme usage.</div>";
        }
      })
      .catch(error => {
        document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>An error occurred. Please try again later.</div>";
        console.error("Error:", error);
      });
  });
</script>
