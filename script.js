document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const text = document.getElementById("bouncy-text");
    const walls = document.querySelectorAll(".wall");
    const letters = text.textContent.split("");

    text.innerHTML = ""; // Clear original text

    letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;

        // **FIX:** Ensure letters start fully inside the box
        span.style.left = `${Math.random() * (container.clientWidth - 50)}px`;
        span.style.top = `${Math.random() * (container.clientHeight - 50)}px`;

        // Assign random velocity
        span.dataset.vx = (Math.random() - 0.5) * 6;
        span.dataset.vy = (Math.random() - 0.5) * 6;

        span.style.position = "absolute";
        span.style.cursor = "grab";
        text.appendChild(span);
    });

    let draggedElement = null;
    let offsetX = 0;
    let offsetY = 0;

    document.querySelectorAll("h1 span").forEach(span => {
        span.addEventListener("mousedown", (event) => {
            draggedElement = event.target;
            offsetX = event.clientX - draggedElement.offsetLeft;
            offsetY = event.clientY - draggedElement.offsetTop;
            draggedElement.style.cursor = "grabbing";
        });
    });

    document.addEventListener("mousemove", (event) => {
        if (draggedElement) {
            let newX = event.clientX - offsetX - container.offsetLeft;
            let newY = event.clientY - offsetY - container.offsetTop;

            // **FIX:** Restrict dragging within 400px boundary
            newX = Math.max(0, Math.min(newX, container.clientWidth - draggedElement.offsetWidth));
            newY = Math.max(0, Math.min(newY, container.clientHeight - draggedElement.offsetHeight));

            draggedElement.style.left = `${newX}px`;
            draggedElement.style.top = `${newY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (draggedElement) {
            draggedElement.style.cursor = "grab";
            draggedElement = null;
        }
    });

    function animate() {
        document.querySelectorAll("h1 span").forEach(span => {
            if (span !== draggedElement) {
                let x = parseFloat(span.style.left);
                let y = parseFloat(span.style.top);
                let vx = parseFloat(span.dataset.vx);
                let vy = parseFloat(span.dataset.vy);

                // **FIX:** Keep letters bouncing inside the 400px box
                if (x + span.offsetWidth >= container.clientWidth || x <= 0) span.dataset.vx = -vx;
                if (y + span.offsetHeight >= container.clientHeight || y <= 0) span.dataset.vy = -vy;

                span.style.left = `${x + vx}px`;
                span.style.top = `${y + vy}px`;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});