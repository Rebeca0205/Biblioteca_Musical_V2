import React from "react";
import { render, screen } from '@testing-library/react'
import Header from '../header';


describe("Header Component", () => {
    it("should render the header correctly", () => {
        render(<Header appName="Mi Biblioteca Musical"/>)

        const AppNameElement = screen.getByText("Mi Biblioteca Musical");
        expect(AppNameElement).toBeInTheDocument();
    })
})