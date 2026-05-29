import { useEffect } from "react";

/**
 * Hook to enable D-Pad navigation (spatial navigation) for TV browsers.
 * It listens for arrow key events and moves focus to the nearest focusable element
 * in the requested direction.
 */
export function useDPadNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)
      ) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement;

      // Special handling for inputs to allow native behavior
      if (activeElement && activeElement.tagName === "INPUT") {
        const input = activeElement as HTMLInputElement;
        if (key === "ArrowLeft" || key === "ArrowRight") {
          // Allow text navigation within inputs
          if (input.type === "text" || input.type === "search" || input.type === "number") {
            return;
          }
        }
      }

      // Prevent default scroll behavior
      e.preventDefault();
      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => {
        // Only include visible elements
        const style = window.getComputedStyle(el);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          el.offsetParent !== null
        );
      });

      if (!activeElement || !focusableElements.includes(activeElement)) {
        // If no element is focused, focus the first one
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
        return;
      }

      const activeRect = activeElement.getBoundingClientRect();
      const activeCenter = {
        x: activeRect.left + activeRect.width / 2,
        y: activeRect.top + activeRect.height / 2,
      };

      let bestElement: HTMLElement | null = null;
      let minDistance = Infinity;

      for (const el of focusableElements) {
        if (el === activeElement) continue;

        const rect = el.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const dx = center.x - activeCenter.x;
        const dy = center.y - activeCenter.y;

        // Determine if the element is in the correct direction
        let isCorrectDirection = false;
        switch (key) {
          case "ArrowUp":
            isCorrectDirection = dy < 0 && Math.abs(dx) < Math.abs(dy) * 2;
            break;
          case "ArrowDown":
            isCorrectDirection = dy > 0 && Math.abs(dx) < Math.abs(dy) * 2;
            break;
          case "ArrowLeft":
            isCorrectDirection = dx < 0 && Math.abs(dy) < Math.abs(dx) * 2;
            break;
          case "ArrowRight":
            isCorrectDirection = dx > 0 && Math.abs(dy) < Math.abs(dx) * 2;
            break;
        }

        if (isCorrectDirection) {
          // Manhattan distance biased towards the primary direction
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            minDistance = distance;
            bestElement = el;
          }
        }
      }

      if (bestElement) {
        bestElement.focus();
        // Ensure the focused element is visible
        bestElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
