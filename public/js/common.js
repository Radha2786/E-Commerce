// console.log('connected');

async function likedButton(productid, btn) {
  try {
    const response = await axios({
      method: "post",
      url: `/product/${productid}/like`,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    if (btn.children[0].classList.contains("fas")) {
      btn.children[0].classList.remove("fas");
      btn.children[0].classList.add("far");
    } else {
      btn.children[0].classList.remove("far");
      btn.children[0].classList.add("fas");
    }
    // console.log(response);
  } catch (error) {
    // console.error("An error occurred while liking the item:", error);
    window.location.replace("/login");
    console.log(error.message);
  }
}

const allLikeButton = document.querySelectorAll(".like-button");
for (let btn of allLikeButton) {
  btn.addEventListener("click", () => {
    const productid = btn.getAttribute("product-id");
    likedButton(productid, btn);
  });
}
