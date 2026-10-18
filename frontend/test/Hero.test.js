import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../src/landing_page/home/Hero.jsx';

// Mock react-router-dom to prevent React Router v7 Jest export resolution errors
jest.mock('react-router-dom', () => ({
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
}));

//TEST SUITE
describe('Hero Component', () => {
    test('renders hero image with correct src and alt text', () => {
        render(<Hero />);
        const heroImage = screen.getByAltText('HERO IMAGE');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', 'media/images/homeHero.png');
    });

    test('renders main heading and description', () => {
        render(<Hero />);
        const heading = screen.getByRole('heading', { level: 1, name: /invest in everything/i });
        expect(heading).toBeInTheDocument();

        const description = screen.getByText(/online platform to invest in stocks/i);
        expect(description).toBeInTheDocument();
    });

    test('renders signup button linking to /signup', () => {
        render(<Hero />);
        const signupBtn = screen.getByRole('link', { name: /sign up for free/i });
        expect(signupBtn).toBeInTheDocument();
        expect(signupBtn).toHaveAttribute('href', '/signup');
    });
});