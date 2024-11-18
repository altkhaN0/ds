document.addEventListener("DOMContentLoaded", function() {
    // HTML'deki data attribute'dan auth key'i alın
    const userAuthKey = document.body.getAttribute("data-auth-key").trim();

    // Key formatını doğrulayan regex deseni
    const keyPattern = /^DS-\d{4}-\d{4}$/;

    // Key'in formatının uygun olup olmadığını kontrol et
    if (!keyPattern.test(userAuthKey)) {
        document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key format (e.g., DS-XXXX-XXXX).</div>";
        console.error("Invalid Auth Key format."); // Hata ayıklama için log
        return; // Doğrulama başarısızsa geri döner
    }

    // Allowlist URL'sini fetch ile al
    fetch('https://raw.githubusercontent.com/altkhaN0/ds/refs/heads/main/allowlist.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load the auth list.");
            }
            return response.json();
        })
        .then(allowlist => {
            console.log("Allowlist received:", allowlist); // Kontrol amaçlı log

            if (!allowlist.includes(userAuthKey)) {
                document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key for theme usage.</div>";
                console.warn("Auth Key not found in the allowlist."); // Hata ayıklama için uyarı
            } else {
                console.log("Auth Key is valid."); // Geçerli anahtar için bilgi
            }
        })
        .catch(error => {
            document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>An error occurred. Please try again later.</div>";
            console.error("Error:", error); // Hata loglama
        });
});
