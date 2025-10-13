// Component using the hook
'use client'

import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useDebounce } from '@/hooks/useDebounce';

export default function RestaurantSearch() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<RestaurantOption[]>([]);
    const debouncedInput = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedInput.length < 2) {
            setOptions([]);
            return;
        }

        async function fetchRestaurants() {
            try {
                const response = await fetch(`/api/search?q=${debouncedInput}`);
                const data = await response.json();
                setOptions(data.results);
            } catch (error) {
                console.error('Search error:', error);
                setOptions([]);
            }
        }

        fetchRestaurants();
    }, [debouncedInput]);

    return (
        <AsyncSelect
            inputValue={inputValue}
            onInputChange={setInputValue}
            options={options}
            placeholder="Search restaurants..."
        />
    );
}