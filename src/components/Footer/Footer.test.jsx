import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Drag and drop text to be in document", () => {
  render(<Footer />);

  expect(screen.getByTestId("drag-n-drop")).toBeInTheDocument();
});
