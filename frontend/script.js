// ================= EMAILJS INIT =================
(function () {
    emailjs.init("KMW-afcVehurm1H1M"); // 👈 tera public key
})();

let generatedOTP;


// ================= GENERATE OTP =================
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}


// ================= SEND OTP =================
function sendOTP() {

    const email = document.getElementById("email").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    generatedOTP = generateOTP();

    const params = {
        to_email: email,
        otp: generatedOTP
    };

    emailjs.send("service_ik55r48", "template_3u67ne7", params)
        .then(() => {
            alert("OTP Sent ✅");
        })
        .catch(() => {
            alert("Failed to send OTP ❌");
        });
}


// ================= VERIFY OTP + SIGNUP =================
async function verifyOTP() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userOTP = document.getElementById("otp").value;

    if (userOTP != generatedOTP) {
        alert("Invalid OTP ❌");
        return;
    }

    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    alert(data.message || data.error);

    if (data.message) {
        window.location.href = "login.html";
    }
}


// ================= LOGIN =================
async function login() {

    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.user) {
        localStorage.setItem("userId", data.user._id);
        alert("Login Success ✅");
        window.location.href = "products.html";
    } else {
        alert(data.error);
    }
}


// ================= SEARCH =================
function searchProduct() {

    const value = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();

        card.style.display = title.includes(value) ? "block" : "none";
    });
}


// ================= CART =================
function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart 🛒");
}


// ================= ADD PRODUCT =================
async function addProduct() {

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const desc = document.getElementById("productDesc").value;
    const image = document.getElementById("productImage").files[0];

    if (!name || !price) {
        alert("Fill all fields");
        return;
    }

    const formData = new FormData();
    formData.append("title", name);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("userId", localStorage.getItem("userId"));

    await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: formData
    });

    alert("Product Added ✅");

    loadProducts();
}


// ================= LOAD PRODUCTS =================
async function loadProducts() {

    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();

    const container = document.getElementById("productList");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="http://localhost:5000${p.image || ''}" />

            <h3>${p.title}</h3>
            <p><b>₹${p.price}</b></p>
            <p>${p.description}</p>

            <button onclick="addToCart('${p._id}')">🛒 Add to Cart</button>
            <button onclick="payNow('${p.price}','${p._id}','${p.userId}')">💳 Buy Now</button>
            <button onclick="openChat('${p.userId}')">💬 Chat</button>

            <div class="review-box">
                <input placeholder="Write review" id="rev-${p._id}">
                <button onclick="addReview('${p._id}')">Submit</button>
            </div>

            <div>
                <h4>Reviews:</h4>
                ${
                    p.reviews && p.reviews.length > 0
                        ? p.reviews.map(r => `<p>⭐ ${r.text}</p>`).join("")
                        : "<p>No reviews yet</p>"
                }
            </div>
        `;

        container.appendChild(card);
    });
}


// ================= REVIEW =================
async function addReview(productId) {

    const input = document.getElementById(`rev-${productId}`);
    const review = input.value;

    if (!review) {
        alert("Write something");
        return;
    }

    await fetch(`http://localhost:5000/api/products/review/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: review })
    });

    alert("Review Added ⭐");

    input.value = "";

    loadProducts();
}


// ================= CHAT =================
function openChat(userId) {
    window.location.href = `chat.html?user=${userId}`;
}


// ================= PAYMENT =================
async function payNow(price, productId, sellerId) {

    const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: price })
    });

    const order = await res.json();

    const options = {
        key: "YOUR_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "Pen2Pizza",
        description: "Purchase",

        handler: async function (response) {

            alert("Payment Successful ✅");

            await fetch("http://localhost:5000/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    buyerId: "456",
                    sellerId: sellerId,
                    productId: productId,
                    paymentId: response.razorpay_payment_id
                })
            });
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}


// ================= PAGE LOAD =================
window.onload = function () {
    loadProducts();
};