// import { useState, useEffect } from 'react';

export const setBooleanInLocalStorage = (key: string, value: boolean) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getBooleanFromLocalStorage = (key: string): boolean => {
    if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : false; // Default to false if not found
    }
    return false; // Default return value when not in browser
};