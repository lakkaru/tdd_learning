import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const commentInput = screen.getByLabelText(/Comments:/);
    fireEvent.change(commentInput, { target: { value: comment } });

    const submitButton1 = screen.getByRole('button');
    fireEvent.click(submitButton1, { dataTransfer: { score, comment } });
    
    expect(handleSubmit).toHaveBeenCalledWith({
      score:"3",
      comment:"The pizza crust was too thick",
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const commentInput = screen.getByLabelText(/Comments:/);
    fireEvent.change(commentInput, { target: { value: "" } });

    const submitButton2 = screen.getByRole('button');
    fireEvent.click(submitButton2);

    expect(handleSubmit).toHaveBeenCalledWith({
      score:"9",
      comment: "",
    });
  });
});
