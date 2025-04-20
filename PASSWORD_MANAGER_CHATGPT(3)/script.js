function maskPassword(pass) {
    return "*".repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    });
}

function deletePassword(website) {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdated = arr.filter(e => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Deleted ${website}'s password.`);
    showPasswords();
}

function showPasswords() {
    let tb = document.getElementById("password-table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
        return;
    }

    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;

    let arr = JSON.parse(data);
    for (let item of arr) {
        tb.innerHTML += `<tr>
            <td>${item.website} <button onclick="copyText('${item.website}')">📋</button></td>
            <td>${item.username} <button onclick="copyText('${item.username}')">📋</button></td>
            <td>${maskPassword(item.password)} <button onclick="copyText('${item.password}')">📋</button></td>
            <td><button onclick="deletePassword('${item.website}')">❌</button></td>
        </tr>`;
    }
}

document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let data = localStorage.getItem("passwords");
    let arr = data ? JSON.parse(data) : [];
    arr.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(arr));
    showPasswords();
    e.target.reset();
});

document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
});

document.getElementById("show-signup").addEventListener("click", () => {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
});

document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let pw = document.getElementById("signup-password").value;
    localStorage.setItem("masterPassword", pw);
    alert("Signup successful! Please login now.");
    document.getElementById("signup-form").reset();
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
});

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let pw = document.getElementById("login-password").value;
    let storedPw = localStorage.getItem("masterPassword");
    if (pw === storedPw) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("main-container").style.display = "block";
        showPasswords();
    } else {
        alert("Incorrect password.");
    }
});

document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("logout-btn").addEventListener("click", () => {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("main-container").style.display = "none";
    document.getElementById("login-form").reset();
});
