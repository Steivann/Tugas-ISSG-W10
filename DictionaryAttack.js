const https = require("https");
const crypto = require("crypto");

const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

function md5Hash(data) {
    return crypto.createHash("md5").update(data).digest("hex");
}
function dictionaryAttack() {
    const url = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt";

    https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            const passwords = data.split("\n");

            for (const password of passwords) {
                const trimmedPassword = password.trim();
                const hash = md5Hash(trimmedPassword);

                if (hash === targetHash) {
                    console.log(`Bob's password is: ${trimmedPassword}`);
                    return;
                }
            }
            console.log("Password not found in the dictionary!");
        });
    }).on("error", (err) => {
        console.error("Error fetching the password list:", err);
    });
}
dictionaryAttack();
