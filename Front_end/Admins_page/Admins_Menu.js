document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".big-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let page;
            switch (button.textContent.trim()) {
                case "User_list":
                    page = "/User_list";
                    break;
                case "Game_list":
                    page = "/Admin_Game_list";
                    break;
                case "Dev_list":
                    page = "/Game_Dev_list";
                    break;
                default:
                    console.error("Unknown button clicked");
                    return;
            }
            // Navigate to the corresponding page
            window.location.href = page;
        });
    });
});
