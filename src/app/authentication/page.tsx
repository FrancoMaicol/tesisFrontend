'use client'
import React from 'react';
import { MainSection } from './main_section/';
import { AuthenticationProvider } from "@context";
import './page.css'


export default function App() {

    return (
        <>
            <AuthenticationProvider>
                <MainSection/>
            </AuthenticationProvider>
        </>
    );
    
}