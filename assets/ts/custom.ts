document.addEventListener("DOMContentLoaded", () => {
  const MAX_HEIGHT = 300;
  document.querySelectorAll<HTMLElement>(".code-fold").forEach(codeBlock => {
    const blockHeight = codeBlock.offsetHeight;

    if (blockHeight > MAX_HEIGHT) {
      codeBlock.removeAttribute("open");
    }
  });
});

