import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Login";

describe("Login Page", () => {
  test("shows error if phone number does not start with +254", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );

    // Match any placeholder starting with +254
    const input = screen.getByPlaceholderText(/^\+254/);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(input, { target: { value: "0712345678" } });
    fireEvent.click(button);

    expect(
      screen.getByText(/phone must start with \+254/i)
    ).toBeInTheDocument();
  });
});
