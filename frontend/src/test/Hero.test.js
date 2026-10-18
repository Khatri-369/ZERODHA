import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../landing_page/home/Hero.jsx';

// Mock react-router-dom to prevent React Router v7 Jest export resolution issues
jest.mock('react-router-dom', () => ({
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
}));

describe('Hero Component', () => {
    test('renders hero image with correct src and alt attributes', () => {
        render(<Hero />);

        const heroImage = screen.getByAltText('HERO IMAGE');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', 'media/images/homeHero.png');
    });

    test('renders main heading and description', () => {
        render(<Hero />);

        const headingElement = screen.getByRole('heading', { level: 1, name: /invest in everything/i });
        expect(headingElement).toBeInTheDocument();

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
