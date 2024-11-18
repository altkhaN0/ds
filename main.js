document.addEventListener("DOMContentLoaded", function() {
    const userAuthKey = document.body.getAttribute('data-auth-key').trim(); // Shopify ayarlarından gelen Auth Key

    // Key formatını doğrulayan regex deseni
    const keyPattern = /^DS-\d{4}-\d{4}$/;

    // Key'in formatının uygun olup olmadığını kontrol et
    if (!keyPattern.test(userAuthKey)) {
        document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key format (e.g., DS-XXXX-XXXX).</div>";
        console.error("Invalid Auth Key format.");
        return;
    }

    // Allowlist URL'sini fetch ile al
    fetch('https://cdn.jsdelivr.net/gh/altkhaN0/ds@main/allowlist.txt')
        .then(response => response.text())  // JSON yerine text olarak alıyoruz
        .then(data => {
            const allowlist = data.split('\n').map(line => line.trim());  // Satırları bölüp diziye çeviriyoruz

            if (!allowlist.includes(userAuthKey)) {
                document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>Please enter a valid Auth Key for theme usage.</div>";
                console.warn("Auth Key not found in the allowlist.");
            } else {
                console.log("Auth Key is valid.");
            }
        })
        .catch(error => {
            document.body.innerHTML = "<div style='background-color: white; padding: 20px; text-align: center;'>An error occurred. Please try again later.</div>";
            console.error("Error:", error);
        });
});
