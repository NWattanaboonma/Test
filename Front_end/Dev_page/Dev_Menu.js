document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".big-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let page;
            switch (button.textContent.trim()) {
                case "Game_list":
                    page = "/Dev_Game_list";
                    break;
                default:
                    console.error("Unknown button clicked");
                    return;
            }

            window.location.href = page;
        });
    });
});